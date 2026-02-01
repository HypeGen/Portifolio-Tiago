import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Upload, 
  Trash2, 
  Plus, 
  X, 
  Image as ImageIcon,
  Eye,
  EyeOff,
  LogOut,
  Save,
  Folder
} from 'lucide-react';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    link: '',
  });

  // Senha do admin (em produção seria via backend)
  const ADMIN_PASSWORD = 'tsg2024admin';

  useEffect(() => {
    // Carregar projetos do localStorage
    const savedProjects = localStorage.getItem('tsg_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    // Verificar se já está autenticado
    const authStatus = sessionStorage.getItem('tsg_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('tsg_admin_auth', 'true');
      setError('');
    } else {
      setError('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tsg_admin_auth');
  };

  const saveProjects = (updatedProjects) => {
    localStorage.setItem('tsg_projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.image) {
      setError('Título e imagem são obrigatórios');
      return;
    }

    const project = {
      id: Date.now().toString(),
      ...newProject,
      tags: newProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    const updatedProjects = [...projects, project];
    saveProjects(updatedProjects);
    setNewProject({ title: '', description: '', image: '', tags: '', link: '' });
    setIsModalOpen(false);
    setError('');
  };

  const handleUpdateProject = () => {
    if (!editingProject.title || !editingProject.image) {
      setError('Título e imagem são obrigatórios');
      return;
    }

    const updatedProjects = projects.map(p => 
      p.id === editingProject.id 
        ? { ...editingProject, tags: typeof editingProject.tags === 'string' 
            ? editingProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            : editingProject.tags }
        : p
    );
    saveProjects(updatedProjects);
    setEditingProject(null);
    setError('');
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      saveProjects(updatedProjects);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Painel Admin
            </h1>
            <p className="text-gray-400">
              Acesso restrito ao administrador
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full btn-primary justify-center"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-8">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              ← Voltar ao site
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#111111] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white">Painel Admin</h1>
              <p className="text-gray-500 text-sm">Gerenciar projetos</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Ver site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-500 text-sm mb-1">Total de Projetos</p>
            <p className="font-display text-3xl font-bold text-white">{projects.length}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-500 text-sm mb-1">Armazenamento</p>
            <p className="font-display text-3xl font-bold text-white">Local</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-500 text-sm mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-white">Ativo</p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-white">Meus Projetos</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary text-sm"
          >
            <Plus className="w-4 h-4" />
            Novo Projeto
          </button>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="font-display text-lg text-white mb-2">
              Nenhum projeto ainda
            </h3>
            <p className="text-gray-500 mb-6">
              Adicione seu primeiro projeto clicando no botão acima.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => setEditingProject({
                        ...project,
                        tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags
                      })}
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs text-gray-400 bg-white/5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-lg bg-[#1a1a1a] rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-white">
                Novo Projeto
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setError('');
                }}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                  placeholder="Nome do projeto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  URL da Imagem *
                </label>
                <input
                  type="text"
                  value={newProject.image}
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Descrição
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all resize-none"
                  placeholder="Descreva o projeto..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                  placeholder="React, Landing Page, UI/UX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Link do Projeto
                </label>
                <input
                  type="text"
                  value={newProject.link}
                  onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                  placeholder="https://projeto.com"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                onClick={handleAddProject}
                className="w-full btn-primary justify-center"
              >
                <Save className="w-4 h-4" />
                Salvar Projeto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-lg bg-[#1a1a1a] rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-white">
                Editar Projeto
              </h3>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setError('');
                }}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  URL da Imagem *
                </label>
                <input
                  type="text"
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Descrição
                </label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={editingProject.tags}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Link do Projeto
                </label>
                <input
                  type="text"
                  value={editingProject.link}
                  onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                onClick={handleUpdateProject}
                className="w-full btn-primary justify-center"
              >
                <Save className="w-4 h-4" />
                Atualizar Projeto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
