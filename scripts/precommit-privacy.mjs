#!/usr/bin/env node
/**
 * Guarda de privacidade para repositório público de portfólio.
 *
 * Roda no pre-commit (via .githooks/pre-commit) e também em `npm run privacy:check`.
 * Verifica APENAS o que este commit introduz:
 *   - linhas ADICIONADAS no diff staged (texto)  -> e-mail cru, CPF, telefone, endereço
 *   - arquivos de imagem/PDF staged               -> GPS/geolocalização e metadados identificáveis
 *
 * Nada aqui é infalível contra scrapers avançados — é uma rede de segurança
 * contra o vazamento acidental. Ver docs/privacy.md.
 *
 * Saída: exit 1 bloqueia o commit. Use `git commit --no-verify` para pular
 * de propósito (e explique no corpo do commit por quê).
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const c = (n, s) => (process.stderr.isTTY ? `\x1b[${n}m${s}\x1b[0m` : s);
const RED = (s) => c(31, s);
const YEL = (s) => c(33, s);
const GRN = (s) => c(32, s);

const errors = [];
const warnings = [];

function sh(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
}
function has(bin) {
  try {
    sh("sh", ["-c", `command -v ${bin} >/dev/null 2>&1`]);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------- staged files
let staged = [];
try {
  staged = sh("git", ["diff", "--cached", "--name-only", "--diff-filter=ACM"])
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
} catch {
  /* fora de um repo git, ou sem commits ainda */
}
if (staged.length === 0) process.exit(0);

const TEXT_EXT = /\.(m?[jt]sx?|mdx|md|json|jsonc|css|html?|txt|ya?ml|svg|toml)$/i;
const IMG_EXT = /\.(jpe?g|png|webp|tiff?|heic|heif|avif|gif)$/i;
const PDF_EXT = /\.pdf$/i;

// Superfície publicada: erro (bloqueia). Fora dela (docs/, scripts/): só aviso.
const SHIPPED = (f) => /^(src|public|content)\//.test(f);

// ------------------------------------------------------------------- padrões
const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
const EMAIL_ALLOW = [
  /noreply@anthropic\.com/i,
  /@example\.(com|org|net)\b/i,
  /\b(you|user|nome|voce)@/i,
  /@(2x|3x)\b/i, // "@2x" em nomes de asset
];
const CPF_RE = /(?<!\d)\d{3}\.\d{3}\.\d{3}-\d{2}(?!\d)/;
const CEP_RE = /(?<!\d)\d{5}-\d{3}(?!\d)/;
const ADDR_RE = /\b(Rua|Avenida|Alameda|Travessa|Rodovia|Praça|Bairro|CEP)\b[\s:]+\S+/i;
// telefone só conta se a linha tiver um marcador de contato (evita falso-positivo
// com qualquer sequência de dígitos)
const PHONE_CONTEXT_RE = /(tel|phone|fone|whats|celular|\+55|\(\d{2}\)\s?9)/i;
const PHONE_RE = /(?:\+55[\s.-]?)?\(?\d{2}\)?[\s.-]?9?\d{4}[\s.-]?\d{4}/;

// o próprio guarda e sua doc contêm os padrões que ele procura — não se escaneiam
const SELF = /^(scripts\/precommit-privacy\.mjs|docs\/privacy\.md)$/;

// ---------------------------------------------------- 1. linhas adicionadas
function addedLines() {
  let diff = "";
  try {
    diff = sh("git", ["diff", "--cached", "--unified=0", "--diff-filter=ACM"]);
  } catch {
    return [];
  }
  const out = [];
  let file = null;
  let lineNo = 0;
  for (const raw of diff.split("\n")) {
    if (raw.startsWith("+++ ")) {
      const m = raw.match(/^\+\+\+ b\/(.+)$/);
      file = m ? m[1] : null;
      continue;
    }
    if (raw.startsWith("@@")) {
      const m = raw.match(/\+(\d+)/);
      lineNo = m ? parseInt(m[1], 10) : 0;
      continue;
    }
    if (raw.startsWith("+") && !raw.startsWith("+++")) {
      if (file && TEXT_EXT.test(file) && !SELF.test(file))
        out.push({ file, lineNo, text: raw.slice(1) });
      lineNo++;
    }
  }
  return out;
}

for (const { file, lineNo, text } of addedLines()) {
  const at = `${file}:${lineNo}`;
  const bucket = SHIPPED(file) ? errors : warnings;

  for (const m of text.matchAll(EMAIL_RE)) {
    const email = m[0];
    if (EMAIL_ALLOW.some((re) => re.test(email))) continue;
    bucket.push(`${at}  e-mail em texto puro: ${email}  → ofusque no client / use um alias dedicado`);
  }
  if (CPF_RE.test(text)) errors.push(`${at}  parece um CPF em texto puro`);
  if (ADDR_RE.test(text)) bucket.push(`${at}  parece um endereço: "${text.trim().slice(0, 70)}"`);
  if (CEP_RE.test(text) && /cep|endere|rua|avenida/i.test(text))
    bucket.push(`${at}  parece um CEP: "${text.trim().slice(0, 70)}"`);
  if (PHONE_CONTEXT_RE.test(text) && PHONE_RE.test(text))
    bucket.push(`${at}  parece um telefone — confirme que não é o número pessoal`);
}

// ------------------------------------------------ 2. metadados de imagem/PDF
const media = staged.filter((f) => (IMG_EXT.test(f) || PDF_EXT.test(f)) && existsSync(f));
if (media.length) {
  if (!has("exiftool")) {
    warnings.push(
      "exiftool não encontrado — metadados de imagens/PDF NÃO verificados. `brew install exiftool` e rode `npm run privacy:check`.",
    );
  } else {
    for (const f of media) {
      let meta;
      try {
        meta = JSON.parse(sh("exiftool", ["-json", "-G", "-n", "-fast2", f]))[0] || {};
      } catch {
        continue;
      }
      const keys = Object.keys(meta);

      const gps = keys.filter((k) => /gps/i.test(k) && meta[k] !== "" && meta[k] != null);
      if (gps.length)
        errors.push(`${f}  contém geolocalização (${gps.join(", ")})  → limpe o EXIF (docs/privacy.md)`);

      const idTags = [
        "EXIF:SerialNumber",
        "EXIF:InternalSerialNumber",
        "EXIF:LensSerialNumber",
        "EXIF:OwnerName",
        "EXIF:CameraOwnerName",
        "EXIF:Artist",
        "EXIF:HostComputer",
        "IPTC:By-line",
        "XMP:Creator",
        "XMP:Author",
      ];
      const idHit = idTags.filter((k) => meta[k]);
      if (idHit.length)
        warnings.push(
          `${f}  metadados identificáveis: ${idHit.map((k) => `${k}=${meta[k]}`).join(", ")}  → limpe o EXIF (docs/privacy.md)`,
        );

      for (const k of ["PDF:Author", "PDF:Creator", "PDF:Producer", "XMP:Author"]) {
        if (meta[k]) warnings.push(`${f}  ${k}=${meta[k]}  — confirme antes de publicar o PDF`);
      }
    }
  }
}

// ------------------------------------------------------------------ relatório
if (warnings.length) {
  console.error(YEL("\n⚠  privacidade — avisos (não bloqueiam o commit):"));
  for (const w of warnings) console.error("   " + w);
}
if (errors.length) {
  console.error(RED("\n✖  privacidade — commit bloqueado:"));
  for (const e of errors) console.error("   " + e);
  console.error(
    RED('\nCorrija, ou rode `git commit --no-verify` se for intencional (justifique no commit).'),
  );
  console.error(YEL("Contexto: docs/privacy.md\n"));
  process.exit(1);
}
console.error(GRN("✓ privacidade: nada suspeito nas mudanças staged"));
process.exit(0);
