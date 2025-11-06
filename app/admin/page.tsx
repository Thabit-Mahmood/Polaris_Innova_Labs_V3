'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaUsers, FaEnvelope, FaUpload, FaKey, FaArrowUp, FaArrowDown, FaTimes, FaImage } from 'react-icons/fa';
import Header from '@/components/Header';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'blogs' | 'subscribers' | 'settings'>('blogs');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  // Password change states
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    images: [] as string[], // Multiple images
    author: 'Polaris Innova Labs',
    published: false,
    display_order: 0,
  });

  // Session management
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    if (password === savedPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      loadData();
    } else {
      alert('كلمة مرور خاطئة');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setPassword('');
  };

  const loadData = async () => {
    try {
      console.log('Loading blogs...');
      const blogsRes = await fetch('/api/admin/blogs');
      const blogsData = await blogsRes.json();
      console.log('Blogs response:', blogsData);
      setBlogs(blogsData.blogs || []);

      console.log('Loading subscribers...');
      const subsRes = await fetch('/api/admin/subscribers');
      const subsData = await subsRes.json();
      console.log('Subscribers response:', subsData);
      setSubscribers(subsData.subscribers || []);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('فشل تحميل البيانات: ' + (error instanceof Error ? error.message : 'خطأ غير معروف'));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        // Set first image as main image, rest as additional images
        const [mainImage, ...additionalImages] = uploadedUrls;
        setBlogForm({ 
          ...blogForm, 
          image_url: blogForm.image_url || mainImage,
          images: [...blogForm.images, ...uploadedUrls]
        });
        alert(`تم رفع ${uploadedUrls.length} صورة بنجاح`);
      }
    } catch (error) {
      alert('حدث خطأ أثناء رفع الصور');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    if (!imageUrl) return;
    
    const filename = imageUrl.split('/').pop();
    try {
      await fetch('/api/admin/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });
      
      // Remove from images array
      const newImages = blogForm.images.filter(img => img !== imageUrl);
      
      // If it's the main image, set a new main image or empty
      const newMainImage = imageUrl === blogForm.image_url 
        ? (newImages[0] || '') 
        : blogForm.image_url;
      
      setBlogForm({ 
        ...blogForm, 
        image_url: newMainImage,
        images: newImages 
      });
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log('Saving blog:', blogForm);
      const url = editingBlog ? `/api/admin/blogs/${editingBlog.id}` : '/api/admin/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogForm),
      });

      const data = await response.json();
      console.log('Blog save response:', data);

      if (response.ok) {
        alert(editingBlog ? 'تم تحديث المقال' : 'تم إضافة المقال');
        setShowBlogForm(false);
        setEditingBlog(null);
        setBlogForm({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          image_url: '',
          images: [],
          author: 'Polaris Innova Labs',
          published: false,
          display_order: 0,
        });
        loadData();
      } else {
        console.error('Blog save error:', data);
        alert('حدث خطأ: ' + (data.error || data.details || 'خطأ غير معروف'));
      }
    } catch (error) {
      console.error('Blog save exception:', error);
      alert('حدث خطأ: ' + (error instanceof Error ? error.message : 'خطأ غير معروف'));
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('تم حذف المقال');
        loadData();
      }
    } catch (error) {
      alert('حدث خطأ');
    }
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlog(blog);
    const images = blog.images ? JSON.parse(blog.images) : [];
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.image_url || '',
      images: images,
      author: blog.author,
      published: blog.published === 1,
      display_order: blog.display_order || 0,
    });
    setShowBlogForm(true);
  };

  const handleReorder = async (id: number, direction: 'up' | 'down') => {
    const index = blogs.findIndex(b => b.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blogs.length - 1) return;

    const newBlogs = [...blogs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlogs[index], newBlogs[targetIndex]] = [newBlogs[targetIndex], newBlogs[index]];

    // Update display_order for both
    try {
      await fetch(`/api/admin/blogs/${newBlogs[index].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newBlogs[index], display_order: index }),
      });
      await fetch(`/api/admin/blogs/${newBlogs[targetIndex].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newBlogs[targetIndex], display_order: targetIndex }),
      });
      loadData();
    } catch (error) {
      alert('فشل إعادة الترتيب');
    }
  };

  const handleRequestPasswordChange = async () => {
    try {
      const response = await fetch('/api/admin/request-password-change', { method: 'POST' });
      if (response.ok) {
        setCodeSent(true);
        alert('تم إرسال رمز التحقق إلى services@polaris-innova-labs.com');
      } else {
        alert('فشل إرسال الرمز');
      }
    } catch (error) {
      alert('حدث خطأ');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('تم تغيير كلمة المرور بنجاح. يرجى تسجيل الدخول مرة أخرى.');
        setShowPasswordChange(false);
        setCodeSent(false);
        setVerificationCode('');
        setNewPassword('');
      } else {
        alert(data.error || 'فشل تغيير كلمة المرور');
      }
    } catch (error) {
      alert('حدث خطأ');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const gregorian = date.toLocaleDateString('ar-SA');
    const islamic = date.toLocaleDateString('ar-SA-u-ca-islamic');
    return `${gregorian} (${islamic})`;
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-dark-400 flex items-center justify-center p-4 pt-24">
          <div className="glass rounded-2xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-white mb-6 font-cairo text-center">
              لوحة التحكم
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
              />
              <button type="submit" className="btn-primary w-full">
                دخول
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark-400 pt-24 pb-8 px-4 md:px-8">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white font-cairo">لوحة التحكم</h1>
            <button onClick={handleLogout} className="btn-outline flex items-center gap-2">
              <span>تسجيل الخروج</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-6 py-3 rounded-lg font-cairo font-bold transition-all ${
                activeTab === 'blogs'
                  ? 'bg-primary text-dark-400'
                  : 'bg-dark-300 text-gray-400 hover:text-white'
              }`}
            >
              <FaEdit className="inline ml-2" />
              المقالات ({blogs.length})
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`px-6 py-3 rounded-lg font-cairo font-bold transition-all ${
                activeTab === 'subscribers'
                  ? 'bg-primary text-dark-400'
                  : 'bg-dark-300 text-gray-400 hover:text-white'
              }`}
            >
              <FaUsers className="inline ml-2" />
              المشتركين ({subscribers.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 rounded-lg font-cairo font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-primary text-dark-400'
                  : 'bg-dark-300 text-gray-400 hover:text-white'
              }`}
            >
              <FaKey className="inline ml-2" />
              الإعدادات
            </button>
          </div>

          {/* Blogs Tab */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <button
                onClick={() => {
                  setShowBlogForm(!showBlogForm);
                  setEditingBlog(null);
                  setBlogForm({
                    title: '',
                    slug: '',
                    excerpt: '',
                    content: '',
                    image_url: '',
                    images: [],
                    author: 'Polaris Innova Labs',
                    published: false,
                    display_order: 0,
                  });
                }}
                className="btn-primary"
              >
                <FaPlus className="inline ml-2" />
                {showBlogForm ? 'إلغاء' : 'إضافة مقال جديد'}
              </button>

              {showBlogForm && (
                <div className="glass rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 font-cairo">
                    {editingBlog ? 'تعديل المقال' : 'مقال جديد'}
                  </h2>
                  <form onSubmit={handleSaveBlog} className="space-y-4">
                    <input
                      type="text"
                      placeholder="العنوان"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
                    />
                    <input
                      type="text"
                      placeholder="الرابط (slug)"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
                    />
                    <textarea
                      placeholder="المقتطف"
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
                    />
                    <textarea
                      placeholder="المحتوى (HTML)"
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      required
                      rows={10}
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
                    />

                    {/* Image Upload */}
                    <div className="space-y-4">
                      <label className="block text-white font-cairo font-bold">صور المقال</label>
                      
                      {/* Upload Button */}
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <FaUpload className="text-3xl text-gray-500 mb-2" />
                        <span className="text-gray-400 font-tajawal">اضغط لرفع صور (يمكن اختيار عدة صور)</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>
                      
                      {uploading && <p className="text-primary font-tajawal">جاري الرفع...</p>}
                      
                      {/* Image Gallery */}
                      {blogForm.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {blogForm.images.map((img, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={img} 
                                alt={`صورة ${index + 1}`} 
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              {img === blogForm.image_url && (
                                <div className="absolute top-2 right-2 bg-primary text-dark-400 px-2 py-1 rounded text-xs font-bold">
                                  الصورة الرئيسية
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDeleteImage(img)}
                                className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <FaTimes />
                              </button>
                              {img !== blogForm.image_url && (
                                <button
                                  type="button"
                                  onClick={() => setBlogForm({ ...blogForm, image_url: img })}
                                  className="absolute bottom-2 right-2 bg-primary/80 text-dark-400 px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  جعلها رئيسية
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="الكاتب"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
                    />
                    <div>
                      <label className="block text-white font-cairo font-bold mb-2">
                        ترتيب العرض
                        <span className="text-gray-400 text-sm font-tajawal mr-2">(الأرقام الأعلى تظهر أولاً)</span>
                      </label>
                      <input
                        type="number"
                        placeholder="مثال: 100 للمقالات المهمة، 0 للعادية"
                        value={blogForm.display_order}
                        onChange={(e) => setBlogForm({ ...blogForm, display_order: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
                      />
                      <p className="text-gray-500 text-sm font-tajawal mt-1">
                        💡 نصيحة: استخدم أرقام مثل 100، 90، 80 لسهولة إعادة الترتيب لاحقاً
                      </p>
                    </div>
                    <label className="flex items-center space-x-3 space-x-reverse text-white font-tajawal">
                      <input
                        type="checkbox"
                        checked={blogForm.published}
                        onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                        className="w-5 h-5"
                      />
                      <span>نشر المقال</span>
                    </label>
                    <button type="submit" className="btn-primary">
                      {editingBlog ? 'تحديث' : 'حفظ'}
                    </button>
                  </form>
                </div>
              )}

              <div className="grid gap-4">
                {blogs.map((blog, index) => (
                  <div key={blog.id} className="glass rounded-xl p-6 flex items-center gap-4">
                    {blog.image_url && (
                      <img src={blog.image_url} alt={blog.title} className="w-24 h-24 object-cover rounded-lg" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white font-cairo mb-2">{blog.title}</h3>
                      <p className="text-gray-400 font-tajawal text-sm mb-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{formatDate(blog.created_at)}</span>
                        <span className="flex items-center gap-1">
                          {blog.published ? <FaEye className="text-primary" /> : <FaEyeSlash className="text-gray-500" />}
                          {blog.published ? 'منشور' : 'مسودة'}
                        </span>
                        <span>الترتيب: {blog.display_order}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleReorder(blog.id, 'up')}
                        disabled={index === 0}
                        className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors disabled:opacity-30"
                      >
                        <FaArrowUp />
                      </button>
                      <button
                        onClick={() => handleReorder(blog.id, 'down')}
                        disabled={index === blogs.length - 1}
                        className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors disabled:opacity-30"
                      >
                        <FaArrowDown />
                      </button>
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === 'subscribers' && (
            <div className="glass rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 font-cairo">
                <FaEnvelope className="inline ml-2" />
                المشتركين في النشرة البريدية
              </h2>
              <div className="space-y-2">
                {subscribers.map((sub: any) => (
                  <div key={sub.id} className="flex items-center justify-between p-4 bg-dark-200 rounded-lg">
                    <div>
                      <p className="text-white font-tajawal">{sub.email}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(sub.subscribed_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="glass rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 font-cairo">
                <FaKey className="inline ml-2" />
                تغيير كلمة المرور
              </h2>
              {!showPasswordChange ? (
                <button onClick={() => setShowPasswordChange(true)} className="btn-primary">
                  تغيير كلمة المرور
                </button>
              ) : (
                <div className="space-y-4 max-w-md">
                  {!codeSent ? (
                    <div>
                      <p className="text-gray-300 font-tajawal mb-4">
                        سيتم إرسال رمز التحقق إلى: services@polaris-innova-labs.com
                      </p>
                      <button onClick={handleRequestPasswordChange} className="btn-primary">
                        إرسال رمز التحقق
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <input
                        type="text"
                        placeholder="رمز التحقق (6 أرقام)"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                        maxLength={6}
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
                      />
                      <input
                        type="password"
                        placeholder="كلمة المرور الجديدة"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 text-white border border-gray-700 focus:border-primary focus:outline-none font-tajawal"
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="btn-primary">
                          تأكيد
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowPasswordChange(false);
                            setCodeSent(false);
                            setVerificationCode('');
                            setNewPassword('');
                          }}
                          className="btn-outline"
                        >
                          إلغاء
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
