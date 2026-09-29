// Module 1: locked answer keys + WER scoring engine.
// Ported verbatim from the prototype's tokenizers/align/scoreText -- the
// alignment algorithm, thresholds and ground-truth text are spec.
// GROUND_TRUTH and TOOLS below are extracted programmatically (not
// hand-retyped) from the source HTML to guarantee byte-for-byte fidelity
// of the CJK ground-truth transcript used for exact-match scoring.

export type Lang = "en" | "yue";

export const GROUND_TRUTH: Record<Lang, string> = {
  en: "If you\u2019ve travelled to Hong Kong, chances are you\u2019ve stayed or worked here. Amongst the skyscrapers of Hong Kong Island, but Hong Kong Island is running out of room to expand. housing is the least affordable anywhere in the world, and you don\u2019t get much for your money. The average size flat is smaller than what you\u2019d get in Manhattan, and many Hong Kongers live in apartments not much bigger than a garage. It\u2019s because of this pressure that the next time you visit, you\u2019re more likely to stay here, across Victoria Harbour in Tsim Sha Tsui. Tsim Sha Tsui is not easy to say, and it\u2019s often mispronounced, so it\u2019s known to expats as TST. Today, the area is a growing metropolis, packed with a huge variety of restaurants, modern hotels and sleek museums. So, it\u2019s hard to believe it once looked like this. During the 1880s, it was a watch post for the British colony. And some of the grand old buildings still remain. This is the 1881 Heritage Building, which used to be the headquarters of the Marine Police. Now, it\u2019s filled with high-end shopping, a hotel, restaurants and bars, but most people come here to take photos. Walk down the road a couple of blocks and you\u2019ll come to Hong Kong\u2019s iconic Peninsula Hotel. Built in 1928, it has made appearances in films like James Bond and The Dark Knight. It\u2019s known for its fleet of Rolls-Royce Phantoms painted in the hotel\u2019s signature green, for which it holds the record for the largest single order. Running through the centre of TST is Nathan Road. What started as a muddy country path built by the British in 1861 is now a shopper\u2019s paradise. Nathan Road is probably best known for its tailors. And the tradition of tempting or twisting the arms of tourists walking by. Handmade suits start at around $300, but for higher-quality threads, go to Empire International Tailors. This unassuming store is, in fact, the base of a global operation. This family-run business sells suits around the world. Mostly thanks to word of mouth. Now, you\u2019re dressed for dinner. Head to the top of One Peking Road Tower. This gem of a Chinese restaurant is made to look like a Hutong or old Chinese alley. Go up two floors and you\u2019ll find Aqua Spirit, one of Hong Kong\u2019s premium bars. It has some of the best views of the city. And when you get tired of the hustle and bustle of Tsim Sha Tsui, walk over to one of Hong Kong\u2019s most famous institutions, the Star Ferry. Running since 1888, this is the oldest mode of transportation across the harbour, and you can hop on for just 30 cents and enjoy one of the world\u2019s most photographed harbours.",
  yue: "\u6b61\u8fce\u6536\u7747\u7121\u7dab 7:30 \u4e00\u5c0f\u6642\u65b0\u805e\u6211\u5468\u53ef\u8335\uff0c\u56e0\u4eca\u665a\u5605\u4e3b\u8981\u65b0\u805e\u5305\u62ec\u5546\u52d9\u90e8\u6279\u8a55\u7f8e\u570b\u4e00\u5572\u5c31\u4ee5\u9ad8\u95dc\u7a05\u5a01\u8105\uff0c\u8b66\u544a\u82e5\u679c\u7f8e\u65b9\u4e00\u610f\u5b64\u884c\uff0c\u5fc5\u5c07\u5805\u6c7a\u61c9\u5c0d\u3002\u4e00\u500b\u5341\u4e09\u6b72\u3001\u5065\u5eb7\u826f\u597d\u5605\u5973\u4ed4\uff0c\u6708\u521d\u60a3\u6709\u4e59\u578b\u6d41\u611f\uff0c\u7559\u9662\u56db\u65e5\uff0c\u60c5\u6cc1\u8f49\u5dee\u6b7b\u4ea1\u3002\u518d\u591a\u4e09\u500b\u7acb\u6cd5\u6703\u8b70\u54e1\u8a71\u5514\u6703\u7af6\u9010\u9023\u4efb\u3002\u8a73\u7d30\u5167\u5bb9\u5546\u52d9\u90e8\u56de\u61c9\u7f8e\u570b\u5c07\u6703\u5c0d\u4e2d\u570b\u5546\u54c1\u52a0\u5fb5 100%\u5605\u95dc\u7a05\uff0c\u91cd\u7533\u4e2d\u65b9\u5c0d\u65bc\u95dc\u7a05\u6230\u5514\u9858\u6253\uff0c\u4f46\u4ea6\u90fd\u5514\u6015\u6253\u3002\u82e5\u679c\u7f8e\u65b9\u4e00\u610f\u5b64\u884c\uff0c\u4e2d\u65b9\u4ea6\u90fd\u5fc5\u5c07\u5805\u6c7a\u63a1\u53d6\u76f8\u61c9\u63aa\u65bd\uff0c\u7dad\u8b77\u81ea\u8eab\u6b63\u7576\u6b0a\u76ca\u3002\u64da\u5831\uff0c\u7f8e\u570b\u6b63\u6e96\u5099\u4e00\u7cfb\u5217\u5605\u5831\u5fa9\u63aa\u65bd\uff0c\u5305\u62ec\u5236\u88c1\u4e2d\u570b\u4f01\u696d\u3002\u4e2d\u7f8e\u8cbf\u6613\u95dc\u4fc2\u518d\u5ea6\u5347\u6eab\uff0c\u7f8e\u570b\u7e3d\u7d71\u7279\u6717\u666e\u64ec\u4e2d\u65b9\u6536\u7dca\u7a00\u571f\u51fa\u53e3\u7ba1\u5236\u70ba\u7531\uff0c\u4e0b\u500b\u6708\u8d77\u5c0d\u4e2d\u570b\u5546\u54c1\u5df2\u751f\u6548\u5605\u4e09\u6210\u95dc\u7a05\u57fa\u790e\u4e0a\uff0c\u984d\u5916\u52a0\u5fb5 100%\u5605\u95dc\u7a05\uff0c\u4e26\u5c0d\u6240\u6709\u95dc\u9375\u8edf\u9ad4\u5be6\u65bd\u51fa\u53e3\u7ba1\u5236\u3002\u5728\u5317\u4eac\uff0c\u5546\u52d9\u90e8\u8868\u793a\uff0c\u4e2d\u65b9\u767c\u5e03\u95dc\u65bc\u7a00\u571f\u7b49\u76f8\u95dc\u7269\u9805\u51fa\u53e3\u7ba1\u5236\u63aa\u65bd\uff0c\u4fc2\u4e2d\u65b9\u4f9d\u64da\u6cd5\u5f8b\u3001\u6cd5\u898f\u4ee5\u6539\u5584\u81ea\u8eab\u51fa\u53e3\u7ba1\u5236\u9ad4\u7cfb\u7684\u6b63\u5e38\u884c\u70ba\u3002\u4e2d\u570b\u5605\u51fa\u53e3\u7ba1\u5236\u4e26\u5514\u4fc2\u7981\u6b62\u51fa\u53e3\u3002\u7b26\u5408\u898f\u5b9a\u5605\u7533\u8acb\u5c07\u4e88\u4ee5\u8a31\u53ef\u3002\u4e8b\u5148\u5df2\u5c31\u63aa\u65bd\u53ef\u80fd\u5c0d\u7522\u4f9b\u93c8\u7522\u751f\u7684\u5f71\u97ff\u9032\u884c\u5145\u5206\u8a55\u4f30\uff0c\u4e26\u78ba\u4fe1\u76f8\u95dc\u5f71\u97ff\u975e\u5e38\u6709\u9650\u3002\u6279\u8a55\u7f8e\u65b9\u6709\u95dc\u8868\u614b\u4fc2\u5178\u578b\u5605\u96d9\u91cd\u6a19\u6e96\uff0c\u9577\u671f\u4ee5\u4f86\uff0c\u7f8e\u65b9\u6cdb\u5316\u570b\u5bb6\u5b89\u5168\u3001\u6feb\u7528\u51fa\u53e3\u7ba1\u5236\u3001\u5c0d\u83ef\u63a1\u53d6\u6b67\u8996\u6027\u505a\u6cd5\uff0c\u5c0d\u534a\u5c0e\u9ad4\u8a2d\u5099\u3001\u6676\u7247\u7b49\u7b49\u773e\u591a\u7522\u54c1\u5be6\u65bd\u55ae\u908a\u9577\u81c2\u7ba1\u8f44\u63aa\u65bd\u3002\u7279\u5225\u4fc2 9\u6708\u4e2d\u7f8e\u99ac\u5fb7\u91cc\u7d93\u8cbf\u6703\u8ac7\u4ee5\u4f86\uff0c\u7f8e\u65b9\u6301\u7e8c\u65b0\u589e\u4e00\u7cfb\u5217\u5c0d\u83ef\u9650\u5236\u63aa\u65bd\uff0c\u56b4\u91cd\u640d\u5bb3\u4e2d\u65b9\u5229\u76ca\uff0c\u56b4\u91cd\u7834\u58de\u96d9\u65b9\u7d93\u8cbf\u6703\u8ac7\u6c1b\u570d\uff0c\u4e2d\u65b9\u5c0d\u6b64\u5805\u6c7a\u53cd\u5c0d\u3002\u7f8e\u65b9\u52d5\u8f12\u4ee5\u9ad8\u95dc\u7a05\u9032\u884c\u5a01\u8105\uff0c\u5514\u4fc2\u540c\u4e2d\u65b9\u76f8\u8655\u5605\u6b63\u78ba\u4e4b\u9053\uff0c\u6566\u4fc3\u7f8e\u65b9\u76e1\u5feb\u7cfe\u6b63\u932f\u8aa4\u505a\u6cd5\uff0c\u4ee5\u5169\u570b\u5143\u9996\u901a\u8a71\u91cd\u8981\u5171\u8b58\u70ba\u5f15\u9818\uff0c\u7dad\u8b77\u597d\u4f86\u4e4b\u4e0d\u6613\u7684\u78cb\u5546\u6210\u679c\uff0c\u7e7c\u7e8c\u767c\u63ee\u4e2d\u7f8e\u7d93\u8cbf\u78cb\u5546\u6a5f\u5236\u4f5c\u7528\uff0c\u5728\u76f8\u4e92\u5c0a\u91cd\u3001\u5e73\u7b49\u5354\u5546\u7684\u57fa\u790e\u4e0a\uff0c\u900f\u904e\u5c0d\u8a71\u89e3\u6c7a\u5404\u81ea\u95dc\u5207\uff0c\u59a5\u5584\u7ba1\u63a7\u5206\u6b67\uff0c\u7dad\u8b77\u4e2d\u7f8e\u7d93\u8cbf\u95dc\u4fc2\u7a69\u5b9a\u5065\u5eb7\u53ef\u6301\u7e8c\u767c\u5c55\u3002\u82e5\u7f8e\u65b9\u4e00\u610f\u5b64\u884c\uff0c\u4e2d\u65b9\u4ea6\u5fc5\u5c07\u5805\u6c7a\u63a1\u53d6\u76f8\u61c9\u63aa\u65bd\uff0c\u7dad\u8b77\u81ea\u8eab\u6b63\u7576\u6b0a\u76ca\u3002\u82f1\u570b\u91d1\u878d\u6642\u5831\u5f15\u8ff0\u6d88\u606f\u4eba\u58eb\u8a71\uff0c\u7f8e\u570b\u6b63\u6e96\u5099\u4e00\u7cfb\u5217\u5605\u5831\u5fa9\u63aa\u65bd\uff0c\u5305\u62ec\u5236\u88c1\u4e2d\u570b\u4f01\u696d\u3001\u5236\u5b9a\u65b0\u7684\u51fa\u53e3\u9650\u5236\uff0c\u4ee5\u53ca\u5c07\u4e2d\u570b\u5605\u5be6\u9ad4\u5217\u5165\u9ed1\u540d\u55ae\u3002\u7121\u7dda\u96fb\u8996\u8a18\u8005\u694a\u5353\u9e9f\u5831\u9053\u3002\u8ca1\u653f\u53f8\u53f8\u9577\u9673\u8302\u6ce2\u5c07\u6703\u5230\u7f8e\u570b\u51fa\u5e2d\u570b\u969b\u8ca8\u5e63\u57fa\u91d1\u7d44\u7e54\u540c\u4e16\u754c\u9280\u884c\u96c6\u5718\u5e74\u6703\uff0c\u4ed6\u8aaa\u5230\u6642\u6703\u4ecb\u7d39\u9999\u6e2f\u6700\u65b0\u767c\u5c55\u60c5\u6cc1\uff0c\u7279\u5225\u4fc2\u5317\u90e8\u90fd\u6703\u5340\u5605\u6f5b\u529b\u3002\u8ca1\u653f\u53f8\u53f8\u9577\u9673\u8302\u6ce2\u55ba\u6700\u65b0\u7db2\u8a8c\u900f\u9732\uff0c\u4eca\u500b\u661f\u671f\u570b\u969b\u8ca8\u5e63\u57fa\u91d1\u7d44\u7e54\u53ca\u4e16\u754c\u9280\u884c\u96c6\u5718\u5e74\u6703\u5c07\u6703\u55ba\u7f8e\u570b\u83ef\u76db\u9813\u8209\u884c\uff0c\u4f62\u6703\u4ee5\u4e2d\u570b\u4ee3\u8868\u5718\u6210\u54e1\u7684\u8eab\u4efd\u53c3\u8207\u6703\u8b70\uff0c\u671f\u9593\u6703\u540c\u7576\u5730\u91d1\u878d\u5546\u6703\u3001\u5b78\u8005\u540c\u667a\u5eab\u7b49\u7b49\u4ea4\u6d41\uff0c\u4ecb\u7d39\u5317\u90e8\u90fd\u6703\u5340\u540c\u5927\u7063\u5340\u7684\u767c\u5c55\u6a5f\u9047\uff0c\u4e26\u4e14\u56e0\u61c9\u4f62\u54cb\u95dc\u6ce8\u5605\u8ab2\u984c\u4f5c\u51fa\u8aaa\u660e\u3002\u4e2d\u7f8e\u7d93\u8cbf\u95dc\u4fc2\u8fd1\u65e5\u518d\u5ea6\u5347\u6eab\uff0c\u9673\u8302\u6ce2\u63d0\u5230\uff0c\u5730\u7de3\u653f\u6cbb\u3001\u55ae\u908a\u4e3b\u7fa9\u3001\u95dc\u7a05\u6230\u7b49\u4e0d\u660e\u6717\u56e0\u7d20\uff0c\u4ee4\u4eba\u5c0d\u4f86\u5e74\u570b\u969b\u5e02\u5834\u9762\u5c0d\u5605\u98a8\u96aa\u500d\u611f\u6182\u616e\uff0c\u5f37\u8abf\u9762\u5c0d\u63ee\u4e4b\u4e0d\u53bb\u5605\u5730\u7de3\u653f\u7d93\u9670\u973e\uff0c\u59cb\u7d42\u76f8\u4fe1\u6e9d\u901a\u5c0d\u8a71\u3001\u5766\u8aa0\u4ea4\u6d41\uff0c\u6709\u52a9\u589e\u5f37\u76f8\u4e92\u7406\u89e3\uff0c\u5efa\u7acb\u4e92\u4fe1\u3002\u4f62\u53c8\u5f15\u8ff0\u7f8e\u570b\u7576\u5c40\u5605\u6578\u5b57\uff0c\u4eca\u5e74\u7b2c\u4e8c\u5b63\u7f8e\u570b\u5c0d\u9999\u6e2f\u5605\u670d\u52d9\u8f38\u51fa\u6309\u5e74\u5927\u589e\u8d85\u904e\u4e00\u6210\u534a\uff0c\u53cd\u6620\u4f62\u5605\u91d1\u878d\u540c\u5c08\u696d\u670d\u52d9\u55ba\u9999\u6e2f\u5605\u696d\u52d9\u986f\u8457\u589e\u9577\u3002\u91cd\u7533\u5373\u4f7f\u570b\u969b\u98a8\u96f2\u8b8a\u5e7b\uff0c\u9999\u6e2f\u55ba\u4e00\u570b\u5169\u5236\u4e0b\uff0c\u5c07\u6703\u4e00\u5982\u65e2\u5f80\u4fdd\u6301\u81ea\u7531\u6e2f\u5605\u5730\u4f4d\uff0c\u7dad\u6301\u7c21\u55ae\u4f4e\u7a05\u5236\uff0c\u5be6\u884c\u958b\u653e\u3001\u7a69\u5b9a\u3001\u53ef\u9810\u6e2c\u5605\u7d93\u8cbf\u653f\u7b56\uff0c\u7e7c\u7e8c\u6b61\u8fce\u5305\u62ec\u7f8e\u570b\u5728\u5167\u5605\u5916\u5546\u524d\u4f86\u6295\u8cc7\u767c\u5c55\u696d\u52d9\u3002\u9673\u8302\u6ce2\u8a71\uff0c\u672c\u6e2f\u5167\u806f\u5916\u901a\u9ad8\u5ea6\u570b\u969b\u5316\uff0c\u540c\u4eba\u624d\u532f\u805a\u7b49\u5605\u512a\u52e2\u55ba\u7576\u524d\u5605\u5f62\u52e2\u4e0b\u66f4\u52a0\u7a81\u51fa\uff0c\u6703\u7e7c\u7e8c\u978f\u56fa\u540c\u50b3\u7d71\u5e02\u5834\u5605\u6df1\u539a\u806f\u7e6b\uff0c\u540c\u6642\u958b\u62d3\u66f4\u591a\u65b0\u8208\u5e02\u5834\uff0c\u64f4\u5927\u670b\u53cb\u5708\u3002\u7121\u7dda\u96fb\u8996\u8a18\u8005\u694a\u5353\u9e9f\u5831\u9053\u3002",
};

export const TOOLS: string[] = [
  "Notta",
  "Doubao",
  "Dear Translator (\u4eb2\u611b\u7684\u7ffb\u8b6f\u5b98)",
  "HappyScribe",
  "iFlytek",
  "SubEasy.ai",
  "Felo Translator",
  "Quark",
  "CapCut",
  "Superbanana Plus",
  "Gemini 3 Pro",
  "Tongyi Tingwu",
  "Speechmatics",
  "WeChat",
  "Qwen",
  "Feishu"
];

function tokenizeEnglish(text: string): string[] {
  const t = text.replace(/[\u2018\u2019]/g, "'").toLowerCase();
  const m = t.match(/[a-z0-9']+/g) || [];
  return m.map((w) => w.replace(/^'+|'+$/g, "")).filter(Boolean);
}

function isCJK(ch: string): boolean {
  const c = ch.codePointAt(0) ?? 0;
  return (c >= 0x4e00 && c <= 0x9fff) || (c >= 0x3400 && c <= 0x4dbf);
}

function tokenizeMixed(text: string): string[] {
  const tokens: string[] = [];
  let buf = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      if (buf) { tokens.push(buf); buf = ""; }
      continue;
    }
    if (isCJK(ch)) {
      if (buf) { tokens.push(buf); buf = ""; }
      tokens.push(ch);
      continue;
    }
    if (/[a-zA-Z0-9%.]/.test(ch)) { buf += ch; continue; }
    if (buf) { tokens.push(buf); buf = ""; }
  }
  if (buf) tokens.push(buf);
  return tokens;
}

export type AlignOp =
  | { type: "match"; ref: string; hyp: string }
  | { type: "sub"; ref: string; hyp: string }
  | { type: "del"; ref: string }
  | { type: "ins"; hyp: string };

export interface AlignResult {
  ops: AlignOp[];
  accuracy: number;
}

export function align(ref: string[], hyp: string[]): AlignResult {
  const n = ref.length, m = hyp.length;
  const dp: number[][] = new Array(n + 1);
  for (let i = 0; i <= n; i++) { dp[i] = new Array(m + 1).fill(0); dp[i][0] = i; }
  for (let j = 0; j <= m; j++) dp[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (ref[i - 1] === hyp[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const ops: AlignOp[] = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && ref[i - 1] === hyp[j - 1] && dp[i][j] === dp[i - 1][j - 1]) {
      ops.push({ type: "match", ref: ref[i - 1], hyp: hyp[j - 1] }); i--; j--;
    } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
      ops.push({ type: "sub", ref: ref[i - 1], hyp: hyp[j - 1] }); i--; j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      ops.push({ type: "del", ref: ref[i - 1] }); i--;
    } else {
      ops.push({ type: "ins", hyp: hyp[j - 1] }); j--;
    }
  }
  ops.reverse();
  const distance = dp[n][m];
  const accuracy = n === 0 ? 0 : Math.max(0, 1 - distance / n) * 100;
  return { ops, accuracy };
}

export function scoreText(lang: Lang, text: string): AlignResult {
  const tokenize = lang === "en" ? tokenizeEnglish : tokenizeMixed;
  const ref = tokenize(GROUND_TRUTH[lang]);
  const hyp = tokenize(text);
  return align(ref, hyp);
}

export function scoreBadgeClass(acc: number | null): "pending" | "good" | "warn" | "bad" {
  if (acc === null) return "pending";
  if (acc >= 90) return "good";
  if (acc >= 70) return "warn";
  return "bad";
}

export function barColor(acc: number): string {
  if (acc >= 90) return "var(--good)";
  if (acc >= 70) return "var(--warn)";
  return "var(--bad)";
}
