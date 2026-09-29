// Module 3: case file manifest, executive roster, and reveal-image
// keyword table -- ported verbatim from the prototype.
// PLACEHOLDER manifest -- swap for the real case-file packet once
// delivered. Left as-is per the professor's explicit instruction.

export interface CaseFile {
  name: string;
  cat: string;
}

export const CASE_FILES: CaseFile[] = [
  {
    "name": "KLSF_Company_Profile.pdf",
    "cat": "Background"
  },
  {
    "name": "KLSF_Sales_Overview.pdf",
    "cat": "Background"
  },
  {
    "name": "Market_Report_Bangkok.pdf",
    "cat": "Background"
  },
  {
    "name": "Market_Report_Malaysia.pdf",
    "cat": "Background"
  },
  {
    "name": "Market_Report_Singapore.pdf",
    "cat": "Background"
  },
  {
    "name": "Bio_Farhana_binti_Nur.pdf",
    "cat": "Background"
  },
  {
    "name": "Bio_Chen_Takaaki.pdf",
    "cat": "Background"
  },
  {
    "name": "Bio_Lam_Tzefoon_James.pdf",
    "cat": "Background"
  },
  {
    "name": "Bio_Adam_bin_Ibrahim.pdf",
    "cat": "Background"
  },
  {
    "name": "Bio_Siti_binti_Muhammad.pdf",
    "cat": "Background"
  },
  {
    "name": "KLSF_Product_Catalog.pdf",
    "cat": "Sales & Marketing"
  },
  {
    "name": "KLSF_Spec_Sheet.pdf",
    "cat": "Sales & Marketing"
  },
  {
    "name": "KLSF_Factory_Profile.pdf",
    "cat": "Sales & Marketing"
  },
  {
    "name": "Shipper_Reg_SiamSeashellLogistics.pdf",
    "cat": "Company Registrations"
  },
  {
    "name": "Shipper_Reg_YuelaiLogistics.pdf",
    "cat": "Company Registrations"
  },
  {
    "name": "Shipper_Reg_FijiFreightAndShipping.pdf",
    "cat": "Company Registrations"
  },
  {
    "name": "Shipper_Reg_RedwoodShippingHK.pdf",
    "cat": "Company Registrations"
  },
  {
    "name": "Shipper_Reg_JapanShippingPointMaritime.pdf",
    "cat": "Company Registrations"
  },
  {
    "name": "Buyer_Reg_MY_AlorSetarOpenWildlifePark.pdf",
    "cat": "Company Registrations"
  },
  {
    "name": "Buyer_Reg_BKK_ChatuchakToyMarket.pdf",
    "cat": "Company Registrations"
  },
  {
    "name": "Buyer_Reg_SG_HappyToyMart.pdf",
    "cat": "Company Registrations"
  },
  {
    "name": "Buyer_Reg_HK_GoldenBearShop.pdf",
    "cat": "Company Registrations"
  },
  {
    "name": "KLSF_INV_0102_SG_HappyToyMart_2026-09-05.pdf",
    "cat": "Sales Invoices"
  },
  {
    "name": "KLSF_INV_0119_HK_GoldenBearShop_2026-09-09.pdf",
    "cat": "Sales Invoices"
  },
  {
    "name": "KLSF_INV_0133_BKK_ChatuchakToyMarket_2026-09-13.pdf",
    "cat": "Sales Invoices"
  },
  {
    "name": "KLSF_INV_0140_MY_AlorSetarWildlifePark_2026-09-15.pdf",
    "cat": "Sales Invoices"
  },
  {
    "name": "KLSF_INV_0155_BKK_SiamSeashellLogistics_2026-09-18.pdf",
    "cat": "Sales Invoices"
  },
  {
    "name": "KLSF_INV_0161_BKK_SiamSeashellLogistics_2026-09-24.pdf",
    "cat": "Sales Invoices"
  },
  {
    "name": "KLSF_INV_0175_FJ_IslandKidsCo_2026-09-30.pdf",
    "cat": "Sales Invoices"
  },
  {
    "name": "Manifest_MSKU7741205_2026-09-12_COMPLETED.pdf",
    "cat": "Shipping Records"
  },
  {
    "name": "Manifest_TCLU9083317_2026-09-14_COMPLETED.pdf",
    "cat": "Shipping Records"
  },
  {
    "name": "Manifest_HJCU2205519_2026-09-18_COMPLETED.pdf",
    "cat": "Shipping Records"
  },
  {
    "name": "Manifest_FSCU4471820_2026-09-20_COMPLETED.pdf",
    "cat": "Shipping Records"
  },
  {
    "name": "Manifest_YLLU3719322_2026-09-16_COMPLETED.pdf",
    "cat": "Shipping Records"
  },
  {
    "name": "Transfer_YLLU3719322_2026-09-25.pdf",
    "cat": "Shipping Records"
  },
  {
    "name": "Manifest_YLLU3719322_2026-09-30_ACTIVE.pdf",
    "cat": "Shipping Records"
  },
  {
    "name": "SearchHistory_HafizBinIsmail.pdf",
    "cat": "Search History"
  },
  {
    "name": "SearchHistory_ChenTakaaki.pdf",
    "cat": "Search History"
  },
  {
    "name": "SearchHistory_LamTzefoonJames.pdf",
    "cat": "Search History"
  },
  {
    "name": "SearchHistory_AdamBinIbrahim.pdf",
    "cat": "Search History"
  },
  {
    "name": "SearchHistory_SitiBintiMuhammad.pdf",
    "cat": "Search History"
  },
  {
    "name": "Email_0071_2026-09-08.pdf",
    "cat": "Emails"
  },
  {
    "name": "Email_0098_2026-09-11.pdf",
    "cat": "Emails"
  },
  {
    "name": "Email_0142_2026-09-19.pdf",
    "cat": "Emails"
  },
  {
    "name": "Email_0148_2026-09-20.pdf",
    "cat": "Emails"
  },
  {
    "name": "Email_0156_2026-09-27.pdf",
    "cat": "Emails"
  },
  {
    "name": "Email_0164_2026-09-28.pdf",
    "cat": "Emails"
  },
  {
    "name": "Email_0203_2026-09-22.pdf",
    "cat": "Emails"
  },
  {
    "name": "Email_0255_2026-09-24.pdf",
    "cat": "Emails"
  },
  {
    "name": "Email_0287_2026-09-29.pdf",
    "cat": "Emails"
  },
  {
    "name": "Photo_LaemChabang_ShippingYard_01.jpg",
    "cat": "Media"
  },
  {
    "name": "Photo_Container_YLLU3719322_Bangkok.jpg",
    "cat": "Media"
  },
  {
    "name": "Photo_AlorSetar_DeliveryDock.jpg",
    "cat": "Media"
  }
];

export interface ExecPosition {
  key: "ceo" | "cfo" | "coo" | "logistics" | "design";
  label: string;
  name: string;
}

export const EXEC_POSITIONS: ExecPosition[] = [
  {
    "key": "ceo",
    "label": "CEO",
    "name": "Chen Takaaki"
  },
  {
    "key": "cfo",
    "label": "CFO",
    "name": "Lam Tzefoon James"
  },
  {
    "key": "coo",
    "label": "COO",
    "name": "Adam bin Ibrahim"
  },
  {
    "key": "logistics",
    "label": "Head of Global Logistics",
    "name": "Siti binti Muhammad"
  },
  {
    "key": "design",
    "label": "Head of Design, QC & Packaging",
    "name": "Farhana binti Nur"
  }
];
export const EXEC_NAMES: string[] = EXEC_POSITIONS.map((p) => p.name);
export const EXEC_NAMES_ALPHA: string[] = [...EXEC_NAMES].sort();

export interface RevealKeyword {
  key: string;
  test: RegExp;
}

// Order matters: first match wins, exactly like the prototype's
// REVEAL_KEYWORDS.some()-style for loop.
export const REVEAL_KEYWORDS: RevealKeyword[] = [
  { key: "gibbon", test: /gibbon|monkey/ },
  { key: "turtle", test: /turtle/ },
  { key: "coconut", test: /coconut/ },
  { key: "bear", test: /bear/ },
  { key: "spider", test: /spider|octopus/ },
  { key: "pangolin", test: /pangolin|armadillo/ },
  { key: "tiger", test: /tiger/ },
  { key: "jellyfish", test: /jelly\s*fish/ },
  { key: "otter", test: /otter/ },
];

export function pickRevealImage(guessText: string): string {
  const g = (guessText || "").toString().trim().toLowerCase();
  for (const kw of REVEAL_KEYWORDS) {
    if (kw.test.test(g)) return kw.key;
  }
  return "otter";
}

// Maps a reveal key to its public/reveal/*.jpg path. otterwin is the
// "you saved the baby otter" success image.
export const REVEAL_IMAGE_SRC: Record<string, string> = {
  otter: "/reveal/otter.jpg",
  turtle: "/reveal/turtle.jpg",
  gibbon: "/reveal/gibbon.jpg",
  coconut: "/reveal/coconut.jpg",
  bear: "/reveal/bear.jpg",
  otterwin: "/reveal/otterwin.jpg",
  spider: "/reveal/spider.jpg",
  pangolin: "/reveal/pangolin.jpg",
  tiger: "/reveal/tiger.jpg",
  jellyfish: "/reveal/jellyfish.jpg",
};

export interface DebriefFactStatic {
  label: string;
  correct: string;
  explain: string;
}

// Static half of DEBRIEF_FACTS (label/correct/explain). The your()/ok()
// functions from the prototype are reimplemented against p3State in
// components/module3/DebriefModal.tsx, in the same order as this array.
export const DEBRIEF_FACTS_STATIC: DebriefFactStatic[] = [
  {
    "label": "Trafficked Animal",
    "correct": "Small-Clawed Otter",
    "explain": "The otter was taken from the wetland zone of Alor Setar Open Wildlife Park during what looked like a routine gift-shop delivery."
  },
  {
    "label": "Shipping Container ID",
    "correct": "YLLU3719322",
    "explain": "This container shows a real cargo release in Bangkok, then an \"export re-booking\" transfer to Siam Seashell Logistics, the shell company behind the otter’s final leg."
  },
  {
    "label": "Guilty Executive",
    "correct": "Farhana \"Nok\" binti Nur (Head of Design, QC & Packaging)",
    "explain": "Farhana is the director of record on Siam Seashell Logistics’ company registration, and directed the driver to its yard by email."
  },
  {
    "label": "Final Destination",
    "correct": "Port of Manaus, Brazil",
    "explain": "Manaus is not one of the company’s six real markets, the anomaly that gives the scheme away."
  }
];
