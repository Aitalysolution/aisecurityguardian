import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Shield, Activity, MessageSquare, Send, BookOpen, Clock, Globe, User, ExternalLink } from 'lucide-react';

const AISecurityGuardianDemo = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [assistantRecommendations, setAssistantRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [securityLog, setSecurityLog] = useState({
    critical: [],
    blocked: [],
    actions: []
  });
  const [stats, setStats] = useState({
    totalEvents: 0,
    criticalEvents: 0,
    blockedAttacks: 0
  });

  // Dati dei corsi
  const courses = [
    {
      id: 1,
      title: "Corso Base di Cybersecurity",
      description: "Serie completa di lezioni sulla sicurezza informatica, dalla teoria alla pratica. Un corso dettagliato per comprendere le basi della cybersecurity.",
      youtubeId: "k19U47ZVj9c",
      playlistId: "PLS-6DsYHk7NdwzyOCaaua1URhr2ZGPg3q",
      author: "HackerJournal.it",
      duration: "Serie completa",
      level: "Principiante",
      language: "Italiano",
      badge: "Corso Completo",
      isPlaylist: true
    },
    {
      id: 2,
      title: "Cybersecurity e Protezione dei Dati Personali",
      description: "Seminario completo sulla cybersecurity e la protezione dei dati personali nelle aziende: aspetti pratici e normativi.",
      youtubeId: "-MFAtjGZVO0",
      author: "Instituto Italiano Privacy",
      duration: "1:28:45",
      level: "Intermedio",
      language: "Italiano",
      badge: "Seminario Completo",
      isPlaylist: false
    },
    {
      id: 3,
      title: "Network Security e Penetration Testing",
      description: "Corso pratico sulla sicurezza delle reti e il penetration testing, con esempi reali e tecniche professionali.",
      youtubeId: "bLhFMUGy0Ak",
      playlistId: "PLu3ADb4nfjU2xD3bR1o4AJu5AB7jRs7sa",
      author: "TERABYTE",
      duration: "Serie completa",
      level: "Avanzato",
      language: "Italiano",
      badge: "Corso Tecnico",
      isPlaylist: true
    },
    {
      id: 4,
      title: "Sicurezza dei Dati Aziendali",
      description: "Guida pratica alla protezione dei dati aziendali: strategie, strumenti e best practice per la sicurezza informatica in azienda.",
      youtubeId: "GeYBbK13NcA",
      author: "Digital Innovation Hub",
      duration: "45:22",
      level: "Intermedio",
      language: "Italiano",
      badge: "Guide Pratiche",
      isPlaylist: false
    },
    {
      id: 5,
      title: "GDPR e Privacy: Guida Completa",
      description: "Corso completo sul GDPR e la protezione dei dati personali: normativa, adempimenti e implementazione pratica.",
      youtubeId: "pzfht_SVuAI",
      author: "Studio Legale Informatico",
      duration: "1:12:34",
      level: "Intermedio",
      language: "Italiano",
      badge: "Corso Normativo",
      isPlaylist: false
    }
  ];

  useEffect(() => {
    const generateEvent = () => {
      const types = ['ATTACCO_DOS', 'MALWARE', 'INTRUSIONE'];
      const type = types[Math.floor(Math.random() * types.length)];
      const severity = Math.random() > 0.5 ? 'ALTO' : 'MEDIO';
      const ip = `192.168.1.${Math.floor(Math.random() * 255)}`;
      
      return {
        id: Date.now(),
        type,
        severity,
        sourceIP: ip,
        timestamp: new Date().toISOString()
      };
    };

    const interval = setInterval(() => {
      const newEvent = generateEvent();
      setEvents(prev => [...prev.slice(-9), newEvent]);
      
      if (newEvent.severity === 'ALTO') {
        setSecurityLog(prev => ({
          ...prev,
          critical: [...prev.critical, {
            ...newEvent,
            impact: 'Critico',
            systemsAffected: ['Server Web', 'Database', 'Firewall'][Math.floor(Math.random() * 3)],
            damage: ['Perdita dati', 'Interruzione servizio', 'Compromissione'][Math.floor(Math.random() * 3)]
          }].slice(-10)
        }));
      }

      if (Math.random() > 0.3) {
        const blockedAttack = {
          ...newEvent,
          blockTime: new Date().toISOString(),
          method: ['Firewall', 'IPS', 'WAF'][Math.floor(Math.random() * 3)],
          action: ['Traffico filtrato', 'IP bloccato', 'Connessione terminata'][Math.floor(Math.random() * 3)],
          effectiveness: Math.floor(Math.random() * 30 + 70)
        };

        setSecurityLog(prev => ({
          ...prev,
          blocked: [...prev.blocked, blockedAttack].slice(-10),
          actions: [...prev.actions, {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            type: newEvent.type,
            action: blockedAttack.action,
            status: 'Completata',
            target: blockedAttack.sourceIP
          }].slice(-10)
        }));

        setStats(prev => ({
          totalEvents: prev.totalEvents + 1,
          criticalEvents: prev.criticalEvents + (newEvent.severity === 'ALTO' ? 1 : 0),
          blockedAttacks: prev.blockedAttacks + 1
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderCourse = (course) => (
    <div key={course.id} className="bg-white p-6 rounded-lg border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{course.title}</h3>
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
          {course.badge}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{course.description}</p>

      <div className="relative w-full pt-[56.25%] mb-4 bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={course.isPlaylist ? 
            `https://www.youtube.com/embed/videoseries?list=${course.playlistId}` :
            `https://www.youtube.com/embed/${course.youtubeId}`
          }
          title={course.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-2" />
          <span>{course.author}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="w-4 h-4 mr-2" />
          <span>{course.level}</span>
        </div>
        <div className="flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          <span>{course.language}</span>
        </div>
      </div>

      <a
        href={course.isPlaylist ? 
          `https://www.youtube.com/playlist?list=${course.playlistId}` :
          `https://www.youtube.com/watch?v=${course.youtubeId}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Accedi al Corso Completo
        <ExternalLink className="w-4 h-4 ml-2" />
      </a>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Security Guardian</h1>
        <div className="text-sm text-gray-500">Demo v1.0</div>
      </div>

      {/* Statistiche */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 text-red-500" />
              Eventi Critici
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.criticalEvents}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 text-green-500" />
              Attacchi Bloccati
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.blockedAttacks}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 text-blue-500" />
              Eventi Totali
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalEvents}</p>
          </CardContent>
        </Card>
      </div>

      {/* Grafico */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Attività di Rete</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={events.map(e => ({ time: new Date(e.timestamp).toLocaleTimeString(), value: 1 }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Eventi dettagliati */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Analisi Dettagliata Eventi</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="critical">
            <TabsList>
              <TabsTrigger value="critical">Eventi Critici</TabsTrigger>
              <TabsTrigger value="blocked">Attacchi Bloccati</TabsTrigger>
              <TabsTrigger value="actions">Azioni di Sicurezza</TabsTrigger>
            </TabsList>

            <TabsContent value="critical">
              <div className="space-y-4">
                {securityLog.critical.map((event) => (
                  <div key={event.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-red-800">{event.type}</h4>
                      <span className="text-sm text-red-600">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Impatto:</span> {event.impact}
                      </div>
                      <div>
                        <span className="font-medium">Sistemi:</span> {event.systemsAffected}
                      </div>
                      <div>
                        <span className="font-medium">Danni:</span> {event.damage}
                      </div>
                      <div>
                        <span className="font-medium">IP:</span> {event.sourceIP}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blocked">
              <div className="space-y-4">
                {securityLog.blocked.map((attack) => (
                  <div key={attack.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-green-800">{attack.type}</h4>
                      <span className="text-sm text-green-600">
                        {new Date(attack.blockTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Metodo:</span> {attack.method}
                      </div>
                      <div>
                        <span className="font-medium">Azione:</span> {attack.action}
                      </div>
                      <div>
                        <span className="font-medium">Efficacia:</span> {attack.effectiveness}%
                      </div>
                      <div>
                        <span className="font-medium">IP:</span> {attack.sourceIP}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="actions">
              <div className="space-y-4">
                {securityLog.actions.map((action) => (
                  <div key={action.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-blue-800">{action.type}</h4>
                      <span className="text-sm text-blue-600">
                        {new Date(action.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Azione:</span> {action.action}
                      </div>
                      <div>
                        <span className="font-medium">Stato:</span> {action.status}
                      </div>
                      <div>
                        <span className="font-medium">IP Target:</span> {action.target}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Corsi di Formazione */}
      <Card>
        <CardHeader>
          <CardTitle>Corsi di Formazione</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {courses.map(renderCourse)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISecurityGuardianDemo;