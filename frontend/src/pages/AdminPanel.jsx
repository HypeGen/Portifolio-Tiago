import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

// Simple Login Component
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const ADMIN_PASSWORD = 'tsg2024admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Senha incorreta');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Painel Admin</h1>
          <p className="text-gray-400">Acesso restrito</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full btn-primary justify-center">Entrar</button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-8">
          <a href="/" className="text-gray-400 hover:text-white transition-colors">← Voltar ao site</a>
        </p>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, onEdit, onDelete }) => (
  <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden group">
    <div className="aspect-video relative overflow-hidden">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <button onClick={onEdit} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30">
          <Eye className="w-5 h-5" />
        </button>
        <button onClick={onDelete} className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30">
          <Lock className="w-5 h-5" />
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-display font-bold text-white mb-1">{project.title}</h3>
      <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
    </div>
  </div>
);

// Main Admin Panel
const AdminPanel = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', image: '', tags: '', link: '' });

  useEffect(() => {
    const saved = localStorage.getItem('tsg_projects');
    if (saved) setProjects(JSON.parse(saved));
    const auth = sessionStorage.getItem('tsg_admin_auth');
    if (auth === 'true') setIsAuth(true);
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
    sessionStorage.setItem('tsg_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuth(false);
    sessionStorage.removeItem('tsg_admin_auth');
  };

  const saveProjects = (list) => {
    localStorage.setItem('tsg_projects', JSON.stringify(list));
    setProjects(list);
  };

  const handleAdd = () => {
    if (!formData.title || !formData.image) return;
    const newProj = {
      id: Date.now().toString(),
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
    };
    saveProjects([...projects, newProj]);
    setFormData({ title: '', description: '', image: '', tags: '', link: '' });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Excluir projeto?')) {
      saveProjects(projects.filter(p => p.id !== id));
    }
  };

  if (!isAuth) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#111111] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-white">Painel Admin</h1>
            <p className="text-gray-500 text-sm">Gerenciar projetos</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Ver site</a>
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-500 text-sm mb-1">Total de Projetos</p>
            <p className="font-display text-3xl font-bold text-white">{projects.length}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-white">Meus Projetos</h2>
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm">+ Novo Projeto</button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="font-display text-lg text-white mb-2">Nenhum projeto ainda</h3>
            <p className="text-gray-500">Adicione seu primeiro projeto.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onEdit={() => {}} onDelete={() => handleDelete(p.id)} />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-lg bg-[#1a1a1a] rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-white">Novo Projeto</h3>
              <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white">×</button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Título"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
              />
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="URL da Imagem"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none resize-none"
              />
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Tags (separadas por vírgula)"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
              />
              <button onClick={handleAdd} className="w-full btn-primary justify-center">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
