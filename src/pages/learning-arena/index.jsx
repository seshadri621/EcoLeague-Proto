import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import LessonCard from './components/LessonCard';
import QuizModal from './components/QuizModal';
import LessonDetailModal from './components/LessonDetailModal';
import LearningPath from './components/LearningPath';
import ChallengeMode from './components/ChallengeMode';
import ExpertSession from './components/ExpertSession';
import ProgressTracker from './components/ProgressTracker';
import MiniGames from './components/MiniGames';

const LearningArena = () => {
  const [activeTab, setActiveTab] = useState('lessons');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLessonDetail, setShowLessonDetail] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);

  // Mock data for lessons
  const lessons = [
    {
      id: 1,
      title: "Climate Change Fundamentals",
      description: "A brief introduction to climate science and its core concepts.",
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=300&fit=crop",
      duration: 5,
      difficulty: "beginner",
      category: "climate",
      tags: ["greenhouse gases", "global warming", "climate science"],
      enrolledCount: 12450,
      rating: 4.8,
      xpReward: 100,
      thumbnail: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=300&fit=crop",
      audioUrl: "https://cdn.pixabay.com/audio/2022/11/17/audio_874b2a321a.mp3",
      sections: [
        {
          title: "What is Climate Change?",
          content: "Climate change refers to long-term shifts in temperatures and weather patterns, primarily driven by human activities.",
          duration: 60
        },
        {
          title: "The Greenhouse Effect",
          content: "A natural process that warms the Earth. An excess of greenhouse gases intensifies this effect, leading to global warming.",
          duration: 90
        },
        {
          title: "Key Greenhouse Gases",
          content: "The main culprits are Carbon Dioxide (CO2), Methane (CH4), and Nitrous Oxide (N2O).",
          duration: 80
        },
        {
          title: "Impacts of Climate Change",
          content: "Impacts include rising sea levels, extreme weather events, and threats to biodiversity.",
          duration: 70
        }
      ],
      quiz: {
        id: 1,
        title: "Climate Change Fundamentals Quiz",
        xpReward: 100,
        questions: [
          {
            question: "What is the primary driver of current climate change?",
            options: ["Volcanic eruptions", "Solar cycles", "Human activities", "Natural climate variability"],
            correctAnswer: 2
          },
          {
            question: "Which of the following is a major greenhouse gas?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide (CO2)", "Argon"],
            correctAnswer: 2
          },
          {
            question: "What is the main goal of the Paris Agreement?",
            options: ["To ban all fossil fuels immediately", "To limit global warming to well below 2°C", "To fund space exploration", "To stop all industrial activity"],
            correctAnswer: 1
          }
        ]
      },
      isCompleted: true,
      progress: 100
    },
    {
      id: 2,
      title: "Biodiversity Conservation",
      description: "Learn methods for protecting species and preserving ecosystems.",
      image: "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?w=400&h=300&fit=crop",
      duration: 7,
      difficulty: "intermediate",
      category: "biodiversity",
      tags: ["conservation", "endangered species", "ecosystems"],
      enrolledCount: 8920,
      rating: 4.9,
      xpReward: 150,
      thumbnail: "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?w=400&h=300&fit=crop",
      audioUrl: "https://cdn.pixabay.com/audio/2023/10/10/audio_163425a9d3.mp3",
      sections: [
        {
          title: "What is Biodiversity?",
          content: "The variety of life on Earth, from the smallest microbe to the largest whale. It's essential for a healthy planet.",
          duration: 70
        },
        {
          title: "Habitat Protection",
          content: "Preserving natural spaces like forests and oceans is key to protecting biodiversity.",
          duration: 120
        },
        {
          title: "Species-Specific Actions",
          content: "Interventions like captive breeding and anti-poaching efforts help save endangered species.",
          duration: 130
        },
        {
          title: "The Role of Community",
          content: "Local communities are crucial partners in successful conservation efforts.",
          duration: 100
        }
      ],
      quiz: {
        id: 2,
        title: "Biodiversity Quiz",
        xpReward: 150,
        questions: [
          {
            question: "What does biodiversity refer to?",
            options: ["The number of rocks in an ecosystem", "The variety of life on Earth", "The total amount of water on Earth", "The height of mountains"],
            correctAnswer: 1
          },
          {
            question: "Which of the following is a primary threat to biodiversity?",
            options: ["Habitat loss", "Building birdhouses", "Planting native flowers", "Recycling"],
            correctAnswer: 0
          },
          {
            question: "What is a 'keystone species'?",
            options: ["The most common species", "A species that has a disproportionately large effect on its environment", "The largest species in an ecosystem", "A species that has been moved to a new environment"],
            correctAnswer: 1
          }
        ]
      },
      isCompleted: false,
      progress: 45
    },
  ];

  // Mock data for learning paths
  const learningPaths = [
    {
      id: 1,
      title: "Climate Action Hero",
      description: "Master climate science and become an advocate for change.",
      category: "climate",
      difficulty: "beginner",
      lessonCount: 12,
      estimatedTime: "6 weeks",
      totalXP: 1200,
      enrolledCount: 8500,
      skills: ["Climate Science", "Carbon Footprint", "Renewable Energy", "Policy Advocacy"],
      prerequisites: [],
      progress: 25
    },
    {
      id: 2,
      title: "Biodiversity Guardian",
      description: "Learn to protect life on Earth through conservation strategies.",
      category: "biodiversity",
      difficulty: "intermediate",
      lessonCount: 15,
      estimatedTime: "8 weeks",
      totalXP: 1800,
      enrolledCount: 6200,
      skills: ["Species Conservation", "Habitat Protection", "Ecosystem Management", "Wildlife Biology"],
      prerequisites: ["Basic Environmental Science"],
      progress: 0
    },
    {
      id: 3,
      title: "Sustainable Innovation Leader",
      description: "Develop expertise in green tech and the circular economy.",
      category: "sustainability",
      difficulty: "advanced",
      lessonCount: 18,
      estimatedTime: "10 weeks",
      totalXP: 2400,
      enrolledCount: 4100,
      skills: ["Circular Economy", "Green Technology", "Sustainable Design", "Innovation Management"],
      prerequisites: ["Renewable Energy Basics", "Environmental Economics"],
      progress: 0
    }
  ];

  // Mock data for challenges
  const challenges = [
    {
      id: 1,
      title: "Climate Quiz Battle",
      description: "Test your climate knowledge against other environmental heroes!",
      category: "climate",
      difficulty: "intermediate",
      xpReward: 200,
      questions: [
        {
          question: "What is the primary greenhouse gas responsible for climate change?",
          options: ["Carbon Dioxide", "Methane", "Nitrous Oxide", "Fluorinated Gases"],
          correctAnswer: 0,
          image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=200&fit=crop"
        },
        {
          question: "Which renewable energy source has the fastest growing capacity worldwide?",
          options: ["Solar Power", "Wind Power", "Hydroelectric", "Geothermal"],
          correctAnswer: 0
        },
        {
          question: "What percentage of global greenhouse gas emissions come from transportation?",
          options: ["10%", "14%", "20%", "25%"],
          correctAnswer: 1
        }
      ]
    }
  ];

  // Mock data for expert sessions
  const expertSessions = [
    {
      id: 1,
      title: "The Future of Renewable Energy",
      description: "Join Dr. Sarah Chen to discuss breakthrough technologies in solar and wind energy.",
      expert: {
        name: "Dr. Sarah Chen",
        title: "Renewable Energy Researcher",
        organization: "MIT Energy Initiative",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c6e2e6c8?w=100&h=100&fit=crop&crop=face"
      },
      scheduledAt: "2024-09-20T15:00:00Z",
      duration: 60,
      status: "upcoming",
      attendeeCount: 245,
      topics: ["Solar Technology", "Wind Energy", "Energy Storage", "Grid Integration"],
      rating: 4.9,
      xpReward: 150,
      coverImage: "https://images.pixabay.com/photo/2017/09/12/13/21/photovoltaic-system-2742304_1280.jpg?w=600&h=300&fit=crop"
    },
  ];

  // Mock user progress data
  const userProgress = {
    level: 5,
    totalXP: 4250,
    streak: 12,
    lessonsCompleted: 28,
    quizzesPassed: 35,
    challengesWon: 8,
    sessionsAttended: 6,
    skills: {
      climate: 75,
      biodiversity: 60,
      sustainability: 85,
      conservation: 45,
      renewable: 70
    },
    recentAchievements: [
      { title: "Climate Expert", date: "2 days ago", xp: 200 },
      { title: "Quiz Master", date: "1 week ago", xp: 150 },
      { title: "Learning Streak", date: "2 weeks ago", xp: 100 }
    ]
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'climate', label: 'Climate Science' },
    { value: 'biodiversity', label: 'Biodiversity' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'conservation', label: 'Conservation' },
    { value: 'renewable', label: 'Renewable Energy' },
    { value: 'policy', label: 'Environmental Policy' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const tabs = [
    { id: 'lessons', label: 'Lessons', icon: 'BookOpen' },
    { id: 'paths', label: 'Learning Paths', icon: 'Route' },
    { id: 'challenges', label: 'Challenges', icon: 'Zap' },
    { id: 'mini-games', label: 'Mini Games', icon: 'Gamepad2' },
    { id: 'experts', label: 'Expert Sessions', icon: 'Users' },
    { id: 'progress', label: 'My Progress', icon: 'TrendingUp' }
  ];

  // Filter lessons based on search and filters
  const filteredLessons = lessons?.filter(lesson => {
    const matchesSearch = lesson?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         lesson?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         lesson?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || lesson?.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || lesson?.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleViewLesson = (lesson) => {
    setSelectedLesson(lesson);
    setShowLessonDetail(true);
  };

  const handleSelectPath = (path) => {
    setSelectedPath(path);
    console.log('Selected learning path:', path);
    // Handle path selection logic here
  };

  const handleJoinSession = (session) => {
    console.log('Joining session:', session);
    // Handle session join logic here
  };

  const handleRemindSession = (session) => {
    console.log('Setting reminder for session:', session);
    // Handle reminder logic here
  };

  const handleViewProgressDetails = () => {
    console.log('Viewing detailed progress');
    // Handle progress details view
  };

  const handleStartQuiz = () => {
    setShowLessonDetail(false);
    setShowQuizModal(true);
  };

  const handleQuizComplete = (score) => {
    console.log(`Quiz completed with score: ${score}%`);
    setShowQuizModal(false);
    setSelectedLesson(null);
    // Handle other quiz completion logic here
  };

  const handleStartChallenge = () => {
    setSelectedChallenge(challenges?.[0]);
    setShowChallengeModal(true);
  };

  const handleChallengeComplete = (score, points) => {
    console.log(`Challenge completed with score: ${score}%, points: ${points}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-forest/10 to-ocean/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-forest to-primary rounded-eco-lg flex items-center justify-center mx-auto mb-6 mission-pulse">
                <Icon name="GraduationCap" size={32} color="white" />
              </div>
              <h1 className="font-headline font-bold text-4xl md:text-5xl text-text-primary mb-4">
                Learning Arena
              </h1>
              <p className="font-body text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                Transform environmental science into engaging micro-learning experiences. 
                Master sustainability through interactive lessons, real-time challenges, and expert insights.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <p className="text-3xl font-bold text-forest">{lessons?.length}</p>
                  <p className="text-sm text-text-secondary">Interactive Lessons</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-achievement">{learningPaths?.length}</p>
                  <p className="text-sm text-text-secondary">Learning Paths</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-ocean">{expertSessions?.length}</p>
                  <p className="text-sm text-text-secondary">Expert Sessions</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-success">50k+</p>
                  <p className="text-sm text-text-secondary">Active Learners</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 font-body font-medium organic-transition whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-forest text-forest'
                      : 'border-transparent text-text-secondary hover:text-forest hover:border-forest/30'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'lessons' && (
            <div>
              {/* Filters */}
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="flex-1 max-w-md">
                      <Input
                        type="search"
                        placeholder="Search lessons, topics, or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e?.target?.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Select
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        placeholder="Category"
                        className="w-48"
                      />
                      <Select
                        options={difficultyOptions}
                        value={selectedDifficulty}
                        onChange={setSelectedDifficulty}
                        placeholder="Difficulty"
                        className="w-48"
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleStartChallenge}
                    iconName="Zap"
                    iconPosition="left"
                    className="quest-button"
                  >
                    Challenge Mode
                  </Button>
                </div>
              </div>

              {/* Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons?.map((lesson) => (
                  <LessonCard
                    key={lesson?.id}
                    lesson={lesson}
                    onStart={handleViewLesson}
                    isCompleted={lesson?.isCompleted}
                    progress={lesson?.progress}
                  />
                ))}
              </div>

              {filteredLessons?.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={24} color="var(--color-text-secondary)" />
                  </div>
                  <h3 className="font-headline font-semibold text-text-primary mb-2">No lessons found</h3>
                  <p className="text-text-secondary font-body">
                    Try adjusting your search criteria or explore different categories.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'paths' && (
            <div>
              <div className="mb-8">
                <h2 className="font-headline font-bold text-2xl text-text-primary mb-4">
                  Structured Learning Paths
                </h2>
                <p className="text-text-secondary font-body">
                  Follow curated learning journeys designed by environmental experts to build comprehensive knowledge and skills.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {learningPaths?.map((path) => (
                  <LearningPath
                    key={path?.id}
                    path={path}
                    onSelectPath={handleSelectPath}
                    isActive={selectedPath?.id === path?.id}
                    progress={path?.progress}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div>
              <div className="mb-8 text-center">
                <h2 className="font-headline font-bold text-2xl text-text-primary mb-4">
                  Challenge Mode
                </h2>
                <p className="text-text-secondary font-body mb-6">
                  Test your environmental knowledge in real-time battles against other eco-heroes!
                </p>
                
                <div className="bg-gradient-to-br from-achievement/10 to-forest/10 rounded-eco-lg p-8 border border-achievement/20">
                  <div className="w-20 h-20 bg-gradient-to-br from-achievement to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 achievement-glow">
                    <Icon name="Zap" size={32} color="white" />
                  </div>
                  <h3 className="font-headline font-bold text-xl text-text-primary mb-4">
                    Ready for a Challenge?
                  </h3>
                  <p className="text-text-secondary font-body mb-6">
                    Compete against EcoBot in fast-paced environmental trivia. 
                    Earn bonus XP and climb the leaderboards!
                  </p>
                  <Button
                    onClick={handleStartChallenge}
                    iconName="Play"
                    iconPosition="left"
                    className="quest-button"
                  >
                    Start Challenge
                  </Button>
                </div>
              </div>

              {/* Challenge Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6 text-center">
                  <div className="w-12 h-12 bg-success/20 rounded-eco-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="Trophy" size={24} color="var(--color-success)" />
                  </div>
                  <h4 className="font-headline font-semibold text-text-primary mb-2">Challenges Won</h4>
                  <p className="text-3xl font-bold text-success">{userProgress?.challengesWon}</p>
                </div>
                
                <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6 text-center">
                  <div className="w-12 h-12 bg-achievement/20 rounded-eco-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="Target" size={24} color="var(--color-achievement)" />
                  </div>
                  <h4 className="font-headline font-semibold text-text-primary mb-2">Best Score</h4>
                  <p className="text-3xl font-bold text-achievement">94%</p>
                </div>
                
                <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6 text-center">
                  <div className="w-12 h-12 bg-forest/20 rounded-eco-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="Users" size={24} color="var(--color-forest)" />
                  </div>
                  <h4 className="font-headline font-semibold text-text-primary mb-2">Global Rank</h4>
                  <p className="text-3xl font-bold text-forest">#127</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mini-games' && <MiniGames />}

          {activeTab === 'experts' && (
            <div>
              <div className="mb-8">
                <h2 className="font-headline font-bold text-2xl text-text-primary mb-4">
                  Expert Sessions
                </h2>
                <p className="text-text-secondary font-body">
                  Learn from leading environmental scientists, activists, and policy makers through interactive sessions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {expertSessions?.map((session) => (
                  <ExpertSession
                    key={session?.id}
                    session={session}
                    onJoin={handleJoinSession}
                    onRemind={handleRemindSession}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ProgressTracker
                  userProgress={userProgress}
                  onViewDetails={handleViewProgressDetails}
                />
              </div>
              
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6">
                  <h3 className="font-headline font-semibold text-text-primary mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => setActiveTab('lessons')}
                      iconName="BookOpen"
                      iconPosition="left"
                    >
                      Continue Learning
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={handleStartChallenge}
                      iconName="Zap"
                      iconPosition="left"
                    >
                      Take Challenge
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => setActiveTab('experts')}
                      iconName="Users"
                      iconPosition="left"
                    >
                      Join Expert Session
                    </Button>
                  </div>
                </div>

                {/* Learning Goals */}
                <div className="bg-white rounded-eco-lg shadow-eco-md border border-border p-6">
                  <h3 className="font-headline font-semibold text-text-primary mb-4">This Week's Goals</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-body text-sm text-text-primary">Complete 3 lessons</span>
                        <span className="font-body text-sm text-text-secondary">2/3</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-forest h-2 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-body text-sm text-text-primary">Win 2 challenges</span>
                        <span className="font-body text-sm text-text-secondary">1/2</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-achievement h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-body text-sm text-text-primary">Attend expert session</span>
                        <span className="font-body text-sm text-text-secondary">0/1</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-ocean h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <LessonDetailModal
        isOpen={showLessonDetail}
        onClose={() => setShowLessonDetail(false)}
        onStartQuiz={handleStartQuiz}
        lesson={selectedLesson}
      />
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        quiz={selectedLesson?.quiz} // This correctly uses the quiz from the selected lesson
        onComplete={handleQuizComplete}
      />
      <ChallengeMode
        isOpen={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        challenge={selectedChallenge}
        onComplete={handleChallengeComplete}
      />
    </div>
  );
};

export default LearningArena;