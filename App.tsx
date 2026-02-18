
import React, { useState, useEffect, useMemo } from 'react';
import { UserRole, UserProfile, CheckIn, RoutineItem, TrafficLightStatus, RiskLevel, JournalEntry } from './types';
import { DEFAULT_ACTIVITIES, RECOVERY_MILESTONES } from './constants';
import Layout from './components/Layout';
import Onboarding from './features/Onboarding';
import Home from './features/Home';
import Wellness from './features/Wellness';
import Routine from './features/Routine';
import Places from './features/Places';
import Support from './features/Support';
import Companion from './features/Companion';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [routine, setRoutine] = useState<RoutineItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [milestoneToCelebrate, setMilestoneToCelebrate] = useState<number | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('silentvoices_user');
    const savedRoutine = localStorage.getItem('silentvoices_routine');
    const savedCheckIns = localStorage.getItem('silentvoices_checkins');
    const savedJournals = localStorage.getItem('silentvoices_journals');
    
    if (savedUser) {
      const parsedUser: UserProfile = JSON.parse(savedUser);
      setUser(parsedUser);
      
      if (savedCheckIns) {
        const checkInsList: CheckIn[] = JSON.parse(savedCheckIns);
        if (checkInsList.length > 0 && parsedUser.totalSoberDays > 10) {
          const lastDate = new Date(checkInsList[0].date).getTime();
          const diffDays = (Date.now() - lastDate) / (1000 * 60 * 60 * 24);
          if (diffDays > 2) {
            setNotification(`Welcome back, ${parsedUser.name}. Remember: your ${parsedUser.totalSoberDays} wins haven't gone away. Resilience is built on returning.`);
          }
        }
      }
    }
    
    if (savedRoutine) {
      setRoutine(JSON.parse(savedRoutine));
    } else {
      setRoutine(DEFAULT_ACTIVITIES.map(a => ({ ...a, completed: false })));
    }

    if (savedCheckIns) setCheckIns(JSON.parse(savedCheckIns));
    if (savedJournals) setJournals(JSON.parse(savedJournals));
  }, []);

  const riskAssessment = useMemo((): RiskLevel => {
    if (!user || checkIns.length < 3) return 'LOW';

    let riskPoints = 0;
    const latest = checkIns.slice(0, 5);
    const moodTrend = latest.map(c => c.mood).reverse();
    const cravingMap: Record<string, number> = { 'none': 0, 'mild': 1, 'strong': 2 };
    const cravingTrend = latest.map(c => cravingMap[c.cravings || 'none'] || 0).reverse();

    const isMoodDeclining = moodTrend[0] > moodTrend[moodTrend.length - 1];
    const areCravingsRising = cravingTrend[0] < cravingTrend[cravingTrend.length - 1];
    if (isMoodDeclining && areCravingsRising) riskPoints += 40;

    const completionRate = routine.filter(r => r.completed).length / routine.length;
    if (completionRate < 0.5) riskPoints += 30;

    const hour = new Date().getHours();
    if (hour >= 23 || hour <= 4) riskPoints += 20;

    if (riskPoints >= 70) return 'HIGH';
    if (riskPoints >= 40) return 'MEDIUM';
    return 'LOW';
  }, [checkIns, routine, user]);

  useEffect(() => {
    if (user && user.riskLevel !== riskAssessment) {
      const updatedUser: UserProfile = { ...user, riskLevel: riskAssessment };
      setUser(updatedUser);
      localStorage.setItem('silentvoices_user', JSON.stringify(updatedUser));
    }
  }, [riskAssessment]);

  const handleOnboarding = (role: UserRole, name: string) => {
    const newUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      role,
      name,
      isPremium: false,
      onboardingCompleted: true,
      joinDate: new Date().toISOString(),
      resilienceScore: 100,
      totalSoberDays: 0,
      totalCheckInDays: 0,
      currentStatus: 'green',
      riskLevel: 'LOW',
      dailySpend: role === UserRole.ADDICTION ? 25 : 0,
      dailyHours: role === UserRole.ADDICTION ? 5 : 0,
      reasonsToStaySober: role === UserRole.ADDICTION ? ["My family deserves the real me", "I want to wake up without guilt", "I have so much more to give"] : ["I deserve my own peace", "I am choosing to respond, not react"],
      isLighthouse: false,
      isVaultLocked: true,
      connections: [],
      completedLessons: []
    };
    setUser(newUser);
    localStorage.setItem('silentvoices_user', JSON.stringify(newUser));
  };

  const updateStatus = (status: TrafficLightStatus) => {
    if (!user) return;
    const newUser = { ...user, currentStatus: status };
    setUser(newUser);
    localStorage.setItem('silentvoices_user', JSON.stringify(newUser));
    if (status === 'red') showToast("Trust Bubble notified: Support is on standby.");
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!user) return;
    if (user.completedLessons.includes(lessonId)) return;
    const updatedLessons = [...user.completedLessons, lessonId];
    const newUser = { ...user, completedLessons: updatedLessons };
    setUser(newUser);
    localStorage.setItem('silentvoices_user', JSON.stringify(newUser));
    showToast("Lesson Completed! Resilience +5");
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const addCheckIn = (checkInData: Omit<CheckIn, 'id' | 'date'>) => {
    const fullCheckIn: CheckIn = {
      ...checkInData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    const updatedCheckIns = [fullCheckIn, ...checkIns];
    setCheckIns(updatedCheckIns);
    localStorage.setItem('silentvoices_checkins', JSON.stringify(updatedCheckIns));
    
    if (user) {
      const totalLogs = user.totalCheckInDays + 1;
      const joinTime = new Date(user.joinDate).getTime();
      const now = Date.now();
      const daysSinceJoin = Math.max(1, Math.floor((now - joinTime) / (1000 * 60 * 60 * 24)));
      
      let newSoberDays = user.totalSoberDays;
      if (user.role !== UserRole.FAMILY_FRIEND) {
        newSoberDays += 1;
        const milestoneHit = RECOVERY_MILESTONES.find(m => m.day === newSoberDays);
        if (milestoneHit) setMilestoneToCelebrate(milestoneHit.day);
      }

      const score = Math.min(100, Math.round((newSoberDays / daysSinceJoin) * 100));
      const newUser: UserProfile = { ...user, totalCheckInDays: totalLogs, totalSoberDays: newSoberDays, resilienceScore: score, isLighthouse: newSoberDays >= 30 ? true : user.isLighthouse };
      setUser(newUser);
      localStorage.setItem('silentvoices_user', JSON.stringify(newUser));
      if (user.role === UserRole.FAMILY_FRIEND) showToast("Self-Care Logged. Your stability is your strength.");
    }
  };

  const addJournalEntry = (content: string) => {
    if (!user) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content
    };
    const updated = [entry, ...journals];
    setJournals(updated);
    localStorage.setItem('silentvoices_journals', JSON.stringify(updated));
    showToast("Reflection Saved to the Vault.");
  };

  const updateRoutine = (id: string) => {
    const newRoutine = routine.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    setRoutine(newRoutine);
    localStorage.setItem('silentvoices_routine', JSON.stringify(newRoutine));
  };

  if (!user || !user.onboardingCompleted) {
    return <Onboarding onComplete={handleOnboarding} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home 
          user={user} 
          routine={routine} 
          onToggleRoutine={updateRoutine} 
          onCheckIn={addCheckIn} 
          checkIns={checkIns} 
          journals={journals}
          onUpdateStatus={updateStatus}
          celebratingMilestone={milestoneToCelebrate}
          onCloseCelebration={() => setMilestoneToCelebrate(null)}
          onNavigate={(tab) => setActiveTab(tab)}
        />;
      case 'companion': return <Companion user={user} />;
      case 'wellness': return <Wellness user={user} onSaveJournal={addJournalEntry} journals={journals} />;
      case 'routine': return <Routine routine={routine} onToggleRoutine={updateRoutine} />;
      case 'places': return <Places user={user} />;
      case 'support': return <Support user={user} onCompleteLesson={handleCompleteLesson} />;
      default: return <Home user={user} routine={routine} onToggleRoutine={updateRoutine} onCheckIn={addCheckIn} checkIns={checkIns} journals={journals} onUpdateStatus={updateStatus} onNavigate={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userRole={user.role}>
      <div className="relative">
        {notification && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300 font-bold text-sm flex items-center gap-3 border border-white/10">
             <span className="text-emerald-400">🛡️</span> {notification}
          </div>
        )}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default App;
