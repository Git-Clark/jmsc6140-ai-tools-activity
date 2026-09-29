// Static site copy -- extracted verbatim from the prototype's HTML so
// none of it was hand-retyped. Treat every string here as spec.

export const HOME_KICKER = "Today's Activity";
export const HOME_H2 = "Hands-on with AI newsroom tools";
export const HOME_PARAS: string[] = [
  "For today's class, we will step away from the theory and history and dive into the relevant and useful skills. Today we will experiment with transcription, document analysis, data visualisation, OSINT, and story pitching tools.",
  "Please note that the best workflow is the one you figure out for yourself. The class PowerPoint gave a walkthrough of all the recommended tools and what to prioritize, but it is up to you to sort the details of how to use AI for accurate and effective news production.",
  "Have fun, good luck, and talk to your classmates while the AI is processing each step."
];

export interface HomeActivity { num: string; title: string; desc: string }
export const HOME_ACTIVITIES: HomeActivity[] = [
  {
    "num": "1",
    "title": "Subtitle Accuracy Checker",
    "desc": "Test AI transcription tools against a locked answer key in English and Cantonese."
  },
  {
    "num": "2",
    "title": "Story Pitch & AI Research",
    "desc": "Build an investigative pitch with AI-assisted research and a Flourish data visual."
  },
  {
    "num": "3",
    "title": "Data Leak Investigation",
    "desc": "Work as a team to trace a leaked document set and crack the case."
  }
];

export const TAB_LABELS: { n: string; label: string }[] = [
  {
    "n": "1",
    "label": "Subtitle Accuracy Checker"
  },
  {
    "n": "2",
    "label": "Story Pitch & AI Research"
  },
  {
    "n": "3",
    "label": "Data Leak Investigation"
  }
];

export const CREDITS_LIS: string[] = [
  "This activity was created for the JMSC6140 AI & Media Innovation course at the School of Future Media, University of Hong Kong, and was designed for educational purposes.",
  "The statistics in the story pitch and fact pattern in the Data Leak Investigation are entirely fictitious and made up. They are not intended to represent or portray any real-world figure, and any similarity is coincidental.",
  "Lesson created by: Professor Alejandro Reyes and Clark Gholamipour.",
  "The Data Leak Investigation was designed by Clark Gholamipour."
];

export const FOOTER_TEXT = "School of Future Media, The University of Hong Kong. Designed for the JMSC6140 AI & Media Innovation class.";

// Repeated verbatim at the top of all three Module 3 stages.
export const CASE_DESCRIPTION = "Your newsroom received an anonymous data leak of a stuffed-toy company in Kuala Lumpur that is secretly trafficking a wild animal. Work through the leaked folder with your team to find which animal, which shipping container, which executive, and where it is headed. Every answer below needs a file name picked from the case files as proof, you cannot type a file name in freely.";
export const PREVIEW_NOTE = "This is a preview build. The real leaked case files are still being uploaded, so the search box below currently lists placeholder file names only.";

export const AI_POLICY_TEXT = "You are strictly prohibited from using AI to write your Headline or 50-Word Summary. AI tools should ONLY be used for comparative background research, cross-referencing datasets in Flourish AI, and discovering relevant coverage using AI discovery tools.";
export const HELP_TEXT = "HELP TO GET STARTED: The goal of the investigation is to find a fact pattern of this situation. Start by asking about info about upcoming shipments and the background of the executives. Good luck!";
export const TRANSITION_TEXT = "Now each of your teammates have all the pieces needed. It is time to bring this case all together. Where can we find the missing animal before the container is set to leave tomorrow.";

export const CLIP_EN_NAME = "English Feature Video News Report";
export const CLIP_YUE_NAME = "Cantonese News Broadcast";

export const LANG_CITE_EN_LINK_TEXT = "This is Hong Kong’s Hottest Neighborhood";
export const LANG_CITE_EN_LINK_HREF = "https://www.youtube.com/watch?v=oRNMFBEE460";
export const LANG_CITE_EN_SUFFIX = ", Bloomberg Originals (May 22, 2018)";
export const LANG_CITE_YUE = "- TVB Broadcast (October 12, 2025)";

export interface OnboardSlide { label: string; paras: string[] }
export const ONBOARD_SLIDES: OnboardSlide[] = [
  {
    "label": "Situation",
    "paras": [
      "Your newsroom received an anonymous tip about an active animal trafficking situation unfolding, and they need you to help find the animal that is set to be moved tomorrow!"
    ]
  },
  {
    "label": "Data Leak",
    "paras": [
      "Along with the tip, the anonymous source shared hundreds of internal company documents from the KL Stuffed Friends Co Ltd., which has been widely suspected of being a front for some illegal activities for years."
    ]
  },
  {
    "label": "Your Task",
    "paras": [
      "With your editor's approval, it is up to your team to go through the company's documents to find out what animal is being trafficked, where it currently is, the executive(s) involved, and the timeline of events for trafficking the animal."
    ]
  },
  {
    "label": "Next Step",
    "paras": [
      "Download the Case Files and use your favorite AI tool to start investigating.",
      "Suggestion: divide the roles and different parts of the data leak. One person can focus on the company and executives, one person on upcoming shipping activity, and one person on recent email communication."
    ]
  },
  {
    "label": "Your News Team",
    "paras": [
      "Please share the name and group members of your news team."
    ]
  },
  {
    "label": "Ready to Get Started!",
    "paras": [
      "In this group activity, your team of 3 to 4 students will act as investigative journalists working together to solve a case. A company in Kuala Lumpur is secretly trafficking a wild animal, and you have access to a leaked folder containing over 600 emails, invoices, shipping manifests, company registrations, search histories, and photos. Work together on one computer to enter your answers, but search through the documents on your own devices to find the clues. To solve the case, you must identify the trafficked animal, locate the current shipping container, name the guilty executive, and map out where the animal is being sent. For every clue, use the search box to pick the exact file name as proof, you cannot type it in freely. When your team is ready, submit your answers to open the shipping container and complete the rescue mission."
    ]
  }
];
