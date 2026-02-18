
import { UserRole, RoutineItem, ResourceCategory, Resource } from './types';

export const COLORS = {
  primary: '#3B7080',
  secondary: '#88B29C',
  background: '#FFF9F0',
  surface: '#FFFFFF',
  text: '#1E293B',
  accent: '#F18F60',
  border: '#E2E8F0',
  mutedText: '#64748B'
};

export const DEFAULT_ACTIVITIES: Omit<RoutineItem, 'completed'>[] = [
  { id: '1', name: 'Meditate', category: 'mind' },
  { id: '2', name: 'Go for a walk', category: 'body' },
  { id: '3', name: 'Drink water', category: 'body' },
  { id: '4', name: 'Read recovery text', category: 'mind' },
  { id: '5', name: 'Help someone', category: 'connection' },
  { id: '6', name: 'Cold shower', category: 'body' },
  { id: '7', name: 'Call a friend', category: 'connection' },
  { id: '8', name: 'Daily reflection', category: 'mind' }
];

export interface Lesson {
  id: string;
  day: number;
  title: string;
  message: string;
  action: string;
}

export const FAMILY_FRIENDS_PATH: Lesson[] = [
  {
    id: 'ff_1',
    day: 1,
    title: 'The Three C’s',
    message: "You need to hear this early and often: You didn't Cause it, you can't Control it, and you can't Cure it.",
    action: "Write down one thing you tried to 'fix' for your loved one this week. Acknowledge that you are letting go of the responsibility for that specific outcome today."
  },
  {
    id: 'ff_2',
    day: 2,
    title: 'The Hijacked Brain',
    message: "Addiction isn't a lack of willpower; it’s a physiological change. When they lie or act out, it’s often the 'addictive voice' protecting its supply, not the person you love.",
    action: "Try to separate the person from the disease. Today, when you feel angry, say to yourself: 'I love the person, I hate the disease.'"
  },
  {
    id: 'ff_3',
    day: 3,
    title: 'Support vs. Enabling',
    message: "Enabling is doing things for them that they are capable of doing. Supporting is helping them get to a meeting or listening when they are sober.",
    action: "Review your Support Action Planner. Is there anything you are doing that is actually preventing them from feeling the consequences of their actions?"
  },
  {
    id: 'ff_4',
    day: 4,
    title: 'Setting Micro-Boundaries',
    message: "Boundaries aren't about changing their behavior; they are about protecting yours. Example: 'I will not have a conversation with you when you have been drinking/using.'",
    action: "Define one 'Micro-Boundary' you will stick to this week. Commit to it in your journal."
  },
  {
    id: 'ff_5',
    day: 5,
    title: 'The Oxygen Mask',
    message: "You cannot pour from an empty cup. If you are physically and mentally exhausted, you are less effective as a support person.",
    action: "Complete your first Self-Care Plan entry. Choose one activity (a walk, a book, a bath) that is just for you—not related to recovery."
  },
  {
    id: 'ff_6',
    day: 6,
    title: 'Communicating with "I"',
    message: "Avoid 'You' statements which trigger defensiveness. Use 'I' statements: 'I feel lonely and hurt when you aren't present at dinner.'",
    action: "Practice one 'I' statement today, even if it's just in your head or in your journal."
  },
  {
    id: 'ff_7',
    day: 7,
    title: 'Marathon, Not a Sprint',
    message: "Recovery is non-linear. There will be good days and bad days. Success is measured by long-term patterns, not 24-hour windows.",
    action: "Look at the Trust Bubble. If it's Amber or Red today, take a deep breath and return to Day 1: You didn't cause this."
  }
];

export const FAST_FRAMEWORK = {
  F: { title: "Fair", desc: "Be fair to both yourself and them. Don't let your needs be overshadowed, but avoid being punitive." },
  A: { title: "Apologies", desc: "No Apologies. Don't apologize for having a boundary or expressing your needs. You have a right to your limits." },
  S: { title: "Stick to Values", desc: "Stay focused on your core needs and values. Don't get distracted by their emotional reactions." },
  T: { title: "Truthful", desc: "Don't make excuses for them or yourself. Honest communication builds the only trust that lasts." }
};

export const RESOURCE_LIBRARY: Resource[] = [
  // Basics of Addiction
  {
    id: 'lib_1',
    category: ResourceCategory.BASICS,
    title: 'The Hijacked Brain',
    description: 'Learn how dopamine pathways change during addiction.',
    isPremium: false,
    icon: '🧠',
    content: "Addiction isn't a lack of willpower; it's a physiological change in the brain's reward system. When a person uses a substance, the brain is flooded with dopamine, the 'pleasure' chemical. Over time, the brain adjusts by reducing its natural dopamine production, making it hard for the person to feel joy from normal activities. This 'hijacking' creates a drive to use that is as fundamental as hunger or thirst."
  },
  {
    id: 'lib_2',
    category: ResourceCategory.BASICS,
    title: 'The 3 C’s Reminder',
    description: "Crucial pinned article for every family member.",
    isPremium: false,
    icon: '📌',
    content: "One of the most powerful realizations in your journey is accepting the Three C's: 1. You didn't Cause it. No matter what happened in the past, addiction is a complex disease. 2. You can't Control it. Their choices and their struggle are their own. 3. You can't Cure it. Recovery must come from their own inner commitment and professional support."
  },
  {
    id: 'lib_3',
    category: ResourceCategory.BASICS,
    title: 'Addiction Dictionary',
    description: 'Understand the clinical reality and terminology.',
    isPremium: true,
    icon: '📖',
    content: "A glossary of terms to bridge the gap between families and clinical professionals. \n- PAWS: Post-Acute Withdrawal Syndrome.\n- Tolerance: The need for more to achieve the same effect.\n- Withdrawal: The physical and mental distress of cessation."
  },
  // Communication Helper
  {
    id: 'lib_4',
    category: ResourceCategory.COMMUNICATION,
    title: '"I" Statement Templates',
    description: 'Fill-in-the-blank scripts for common scenarios.',
    isPremium: false,
    icon: '💬',
    content: "Scenario: Late home for dinner.\n'I feel lonely and hurt when you aren't present at dinner because I value our time together.' This approach avoids triggering defensiveness by focusing on your experience rather than their failure."
  },
  {
    id: 'lib_5',
    category: ResourceCategory.COMMUNICATION,
    title: 'Conflict Script Generator',
    description: 'Advanced AI-powered script generator for high-stress talks.',
    isPremium: true,
    icon: '⚡',
    content: "Our AI-powered tool analyzes your specific situation and generates custom scripts that follow the best practices of non-violent communication and CRAFT therapy. (Full tool available to Premium members)."
  },
  // Boundary Builder
  {
    id: 'lib_6',
    category: ResourceCategory.BOUNDARY,
    title: 'Enabling vs. Supporting',
    description: 'Diagnostic quiz to identify your behavior patterns.',
    isPremium: false,
    icon: '⚖️',
    content: "Supporting is helping them get to a meeting. Enabling is paying their rent so they don't have to face the consequence of spending their money on substances. Take this time to reflect: Are you preventing them from feeling the weight of their choices?"
  },
  {
    id: 'lib_7',
    category: ResourceCategory.BOUNDARY,
    title: 'The Art of "No"',
    description: 'Audio-led guides for setting compassionate limits.',
    isPremium: true,
    icon: '🎙️',
    content: "Practice these phrases: 'I love you, but I will not allow drugs in my house.' 'I will not have this conversation while you are intoxicated.' Consistency is the key to a healthy boundary."
  },
  // Self-Care
  {
    id: 'lib_8',
    category: ResourceCategory.SELF_CARE,
    title: 'Identifying Burnout',
    description: 'Checklist for caregiver fatigue and overwhelm.',
    isPremium: false,
    icon: '🕯️',
    content: "Symptoms of caregiver fatigue include chronic exhaustion, loss of interest in your own hobbies, and feeling constantly 'on edge'. If you identify these, it is time to put on your own oxygen mask first."
  },
  {
    id: 'lib_9',
    category: ResourceCategory.SELF_CARE,
    title: 'Advanced CRAFT Training',
    description: 'Deep-dive into Community Reinforcement and Family Training.',
    isPremium: true,
    icon: '🎓',
    content: "A comprehensive course on using positive reinforcement to encourage your loved one toward treatment while maintaining your own sanity. Developed by leading psychologists."
  },
  // Crisis & Relapse
  {
    id: 'lib_10',
    category: ResourceCategory.CRISIS,
    title: 'The Relapse Protocol',
    description: 'Step-by-step guide for the first 48 hours of a slip.',
    isPremium: false,
    icon: '🛡️',
    content: "1. Stay calm. Your reaction can escalate the situation. 2. Ensure safety. 3. Do not engage in deep conversations while they are under the influence. 4. Re-evaluate your boundaries once they are sober."
  }
];

export interface Milestone {
  day: number;
  title: string;
  science: string;
  message: string;
  reward: string;
  icon: string;
}

export const RECOVERY_MILESTONES: Milestone[] = [
  {
    day: 1,
    title: "The Courageous Leap",
    science: "Blood levels of substances are dropping to zero. Dehydration is actively reversing.",
    message: "You made the hardest choice a human can make: the choice to change. Today isn't about the next year; it's about the next hour. You are already winning.",
    reward: "Unlock: Emergency Safety Net widget",
    icon: "🚀"
  },
  {
    day: 7,
    title: "The Physical Turning Point",
    science: "Most physical withdrawal symptoms peak and recede. Liver enzymes stabilize, and REM sleep begins to normalize.",
    message: "A full week. Your body is officially in 'Repair Mode.' If you're feeling foggy, that's your brain recalibrating dopamine levels. It's a sign of healing.",
    reward: "Unlock: Foundation Badge & Safe Place Finder",
    icon: "🧬"
  },
  {
    day: 14,
    title: "The Clarity Window",
    science: "The 'Brain Fog' begins to lift. Cognitive functions like focus and short-term memory show measurable improvement. Cortisol declines.",
    message: "Two weeks in. The 'fog' is lifting. You might notice colors seem brighter or coffee tastes better. Enjoy these sensory wins—your reward system is coming back online.",
    reward: "Unlock: Pattern Spotting Dashboard",
    icon: "🌤️"
  },
  {
    day: 30,
    title: "The New Baseline",
    science: "A major psychological milestone. Your brain strengthens goal-directed pathways over impulse-driven ones.",
    message: "One month. You've built a foundation. You are no longer just 'not using'; you are 'in recovery.' This month proves you have the tools for the hard days.",
    reward: "Eligibility: Lighthouse Peer Mentor & Digital Coin",
    icon: "⚓"
  }
];

export const JOURNAL_PROMPTS: Record<UserRole, string[]> = {
  [UserRole.ADDICTION]: [
    "What felt heavy today that you managed to carry anyway?",
    "Identify one trigger you noticed and how it felt in your body.",
    "What is one small win you can celebrate tonight?"
  ],
  [UserRole.RECOVERY]: [
    "How does your body feel today compared to when you were using?",
    "Write a thank-you note to the version of you from last month.",
    "Which part of your new routine is bringing you the most peace?"
  ],
  [UserRole.FAMILY_FRIEND]: [
    "Identify one thing your loved one did today that was independent of your help.",
    "What are you doing today specifically for your own peace of mind?",
    "Describe a boundary you maintained today and how it felt."
  ]
};

export const HEALTH_MILESTONES = [
  { days: 3, label: "Blood sugar levels begin to stabilize" },
  { days: 7, label: "Sleep cycles start to normalize" },
  { days: 14, label: "Neural pathways begin basic recalibration" },
  { days: 30, label: "Liver enzyme stabilization window opens" },
  { days: 90, label: "Dopamine receptors show significant recovery" }
];

export const RESOURCE_CONTACTS = [
  { id: 'r1', name: 'NHS 111 (UK)', role: 'Medical Advice', phone: '111', isResource: true, region: 'UK' },
  { id: 'r2', name: 'Samaritans (UK)', role: 'Emotional Support', phone: '116123', isResource: true, region: 'UK' },
  { id: 'r3', name: 'FRANK (UK)', role: 'Addiction Info', phone: '03001236600', isResource: true, region: 'UK' },
  { id: 'r4', name: 'SAMHSA (USA)', role: 'Treatment Referral', phone: '1-800-662-4357', isResource: true, region: 'USA' },
  { id: 'r5', name: 'Crisis Text Line', role: 'Global SMS', phone: '741741', isResource: true, region: 'Global' },
  { id: 'r6', name: 'AA / NA Global', role: 'Peer Support', phone: 'Online Directory', isResource: true, region: 'Global' }
];

export const AFFIRMATIONS = [
  "I am worthy of a life filled with peace and health.",
  "One day at a time, I am building a future I can be proud of.",
  "My progress is not defined by perfection, but by persistence.",
  "I have the strength to navigate today's challenges.",
  "I am not my past; I am my possibilities.",
  "Taking care of myself is the best way to care for my loved ones."
];

export const ROLE_LABELS = {
  [UserRole.ADDICTION]: 'Person in Addiction',
  [UserRole.RECOVERY]: 'Person in Recovery',
  [UserRole.FAMILY_FRIEND]: 'Family or Friend'
};
