import React, { useState } from 'react';
import {
  X,
  Lock,
  LogOut,
  Package,
  Calendar,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Phone,
  Image as ImageIcon
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../data/initialData';
import { IMAGES } from '../assets/imageRegistry';
import { SafeImage } from './SafeImage';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    business,
    updateBusiness,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    appointments,
    updateAppointmentStatus,
    enquiries,
    updateEnquiryStatus,
    gallery,
    addGalleryItem,
    deleteGalleryItem
  } = useStore();

  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'appointments' | 'enquiries' | 'settings' | 'gallery'>('overview');

  // Product form state
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<'door-handles' | 'locks' | 'cabinet' | 'sanitary' | 'tools'>('door-handles');
  const [prodPrice, setProdPrice] = useState(1500);
  const [prodMaterial, setProdMaterial] = useState('Solid Brass');
  const [prodFinishes, setProdFinishes] = useState('Brushed Brass, Matte Black, Satin Nickel');
  const [prodDesc, setProdDesc] = useState('');
  const [prodSku, setProdSku] = useState('');

  // Gallery form state
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState('Showroom');
  const [galDesc, setGalDesc] = useState('');

  // Settings form state
  const [settingsAnnouncement, setSettingsAnnouncement] = useState(business.announcementText);
  const [settingsActive, setSettingsActive] = useState(business.announcementActive);
  const [settingsPhone, setSettingsPhone] = useState(business.phone);
  const [settingsAddress, setSettingsAddress] = useState(business.address);
  const [settingsWeekdays, setSettingsWeekdays] = useState(business.openingHours.weekdays);
  const [settingsSunday, setSettingsSunday] = useState(business.openingHours.sunday);
  const [settingsSaved, setSettingsSaved] = useState(false);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setAuthError('Incorrect passcode. Please try again (demo passcode: admin123).');
    } else {
      setAuthError('');
      setPassword('');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const finishesArray = prodFinishes.split(',').map((f) => f.trim()).filter(Boolean);

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: prodName,
        categoryKey: prodCategory,
        category: prodCategory === 'door-handles' ? 'Door Handles' : prodCategory === 'locks' ? 'Locks & Security' : prodCategory === 'cabinet' ? 'Cabinet & Kitchen' : 'Bathroom & Sanitary',
        price: Number(prodPrice),
        material: prodMaterial,
        finishes: finishesArray,
        description: prodDesc,
        sku: prodSku
      });
    } else {
      addProduct({
        name: prodName,
        categoryKey: prodCategory,
        category: prodCategory === 'door-handles' ? 'Door Handles' : prodCategory === 'locks' ? 'Locks & Security' : prodCategory === 'cabinet' ? 'Cabinet & Kitchen' : 'Bathroom & Sanitary',
        price: Number(prodPrice),
        material: prodMaterial,
        finishes: finishesArray,
        description: prodDesc,
        features: ['Precision engineered', 'Tested for 200,000 cycles', 'Corrosion resistant PVD'],
        inStock: true,
        image: prodCategory === 'locks' ? IMAGES.precisionMortiseLock : prodCategory === 'cabinet' ? IMAGES.cabinetPullsKitchen : prodCategory === 'sanitary' ? IMAGES.brassBathroomSuite : IMAGES.doorHandlesMarble,
        sku: prodSku || `CH-${Date.now().toString().slice(-4)}`
      });
    }

    setShowProductForm(false);
    setEditingProductId(null);
    setProdName('');
    setProdDesc('');
    setProdSku('');
  };

  const handleEditClick = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdCategory(p.categoryKey);
    setProdPrice(p.price);
    setProdMaterial(p.material);
    setProdFinishes(p.finishes.join(', '));
    setProdDesc(p.description);
    setProdSku(p.sku);
    setShowProductForm(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness({
      announcementText: settingsAnnouncement,
      announcementActive: settingsActive,
      phone: settingsPhone,
      address: settingsAddress,
      openingHours: {
        weekdays: settingsWeekdays,
        sunday: settingsSunday
      }
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle) return;
    addGalleryItem({
      title: galTitle,
      category: galCategory,
      description: galDesc,
      image: IMAGES.showroomBoutique
    });
    setGalTitle('');
    setGalDesc('');
    setShowGalleryForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[88vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-[#17191E] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-[#D97706] border border-amber-500/30 flex items-center justify-center font-bold text-sm">
              CH
            </div>
            <div>
              <h2 className="text-base font-bold font-display leading-tight">
                Classic Hardware Admin Management
              </h2>
              <p className="text-[11px] text-slate-400">
                Products, Showroom Appointments & Client Inquiries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier if not authenticated */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 mb-1">
                Owner Authentication
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Enter your administrative passcode to manage products, appointments, and store content.
              </p>

              {authError && (
                <div className="mb-4 p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs text-left">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  required
                  placeholder="Enter passcode (demo: admin123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#D97706]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#17191E] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Authenticate
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                Quick Demo Access: Passcode is <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded">admin123</code>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden bg-slate-50">
            {/* Sidebar Navigation */}
            <div className="w-full sm:w-56 bg-white border-r border-slate-200 p-3 sm:p-4 flex flex-row sm:flex-col gap-1.5 shrink-0 overflow-x-auto sm:overflow-x-visible">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#17191E] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Package className="w-4 h-4 text-[#D97706]" />
                Overview
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between whitespace-nowrap cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#17191E] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Products
                </span>
                <span className="text-[11px] font-mono opacity-80">{products.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between whitespace-nowrap cursor-pointer ${
                  activeTab === 'appointments'
                    ? 'bg-[#17191E] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Consultations
                </span>
                <span className="text-[11px] font-mono opacity-80">{appointments.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('enquiries')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between whitespace-nowrap cursor-pointer ${
                  activeTab === 'enquiries'
                    ? 'bg-[#17191E] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Enquiries
                </span>
                <span className="text-[11px] font-mono opacity-80">{enquiries.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#17191E] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Gallery
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#17191E] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                Store Settings
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        Catalog Items
                      </div>
                      <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                        {products.length}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Active for quote</div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        Appointments
                      </div>
                      <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                        {appointments.length}
                      </div>
                      <div className="text-[11px] text-emerald-600 mt-1">Showroom visits</div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        Customer Inquiries
                      </div>
                      <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                        {enquiries.length}
                      </div>
                      <div className="text-[11px] text-amber-600 mt-1">Project quotes</div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        Google Rating
                      </div>
                      <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                        ★ {business.googleRating}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{business.reviewCount} Verified</div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">
                      Latest Showroom Bookings & Requests
                    </h3>
                    {appointments.length === 0 ? (
                      <p className="text-xs text-slate-500">No appointments recorded yet.</p>
                    ) : (
                      <div className="divide-y divide-slate-100 text-xs">
                        {appointments.slice(0, 3).map((apt) => (
                          <div key={apt.id} className="py-2.5 flex items-center justify-between">
                            <div>
                              <span className="font-semibold text-slate-900">{apt.name}</span>
                              <span className="text-slate-400 ml-2">({apt.phone})</span>
                              <div className="text-slate-500 text-[11px]">{apt.serviceType}</div>
                            </div>
                            <div className="text-right">
                              <span className="font-mono font-medium text-slate-700">{apt.date} at {apt.timeSlot}</span>
                              <span className="block text-[11px] text-[#D97706] font-semibold">{apt.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Products Management Tab */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Manage Products & Prices
                    </h3>
                    <button
                      onClick={() => {
                        setEditingProductId(null);
                        setProdName('');
                        setProdDesc('');
                        setProdPrice(2000);
                        setShowProductForm(true);
                      }}
                      className="px-3 py-1.5 bg-[#17191E] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add New Product
                    </button>
                  </div>

                  {showProductForm && (
                    <form onSubmit={handleSaveProduct} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-slate-900">
                          {editingProductId ? 'Edit Product' : 'Add New Hardware Product'}
                        </h4>
                        <button type="button" onClick={() => setShowProductForm(false)}>
                          <X className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Product Name"
                          value={prodName}
                          onChange={(e) => setProdName(e.target.value)}
                          className="px-3 py-2 text-xs border rounded-lg"
                        />
                        <select
                          value={prodCategory}
                          onChange={(e) => setProdCategory(e.target.value as any)}
                          className="px-3 py-2 text-xs border rounded-lg"
                        >
                          <option value="door-handles">Door Handles</option>
                          <option value="locks">Locks & Security</option>
                          <option value="cabinet">Cabinet & Kitchen</option>
                          <option value="sanitary">Bathroom & Sanitary</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="number"
                          required
                          placeholder="Price (₹)"
                          value={prodPrice}
                          onChange={(e) => setProdPrice(Number(e.target.value))}
                          className="px-3 py-2 text-xs border rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Material (e.g. Solid Brass)"
                          value={prodMaterial}
                          onChange={(e) => setProdMaterial(e.target.value)}
                          className="px-3 py-2 text-xs border rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="SKU"
                          value={prodSku}
                          onChange={(e) => setProdSku(e.target.value)}
                          className="px-3 py-2 text-xs border rounded-lg"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Finishes (comma separated, e.g. Brushed Brass, Matte Black)"
                        value={prodFinishes}
                        onChange={(e) => setProdFinishes(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      />

                      <textarea
                        rows={2}
                        placeholder="Product Description"
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      />

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowProductForm(false)}
                          className="px-3 py-1.5 text-xs text-slate-600 bg-slate-100 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-[#17191E] rounded-lg"
                        >
                          Save Product
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                    {products.map((p) => (
                      <div key={p.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                          <SafeImage src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover border" />
                          <div>
                            <div className="font-bold text-slate-900">{p.name}</div>
                            <div className="text-[11px] text-slate-500">
                              SKU: {p.sku} · {p.category} · {p.material}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-mono font-bold text-slate-900">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 text-slate-500 hover:text-slate-900"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appointments Management Tab */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Showroom Consultations ({appointments.length})
                  </h3>

                  <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{apt.name}</div>
                          <div className="text-slate-600 mt-0.5">
                            Phone: <a href={`tel:${apt.phone}`} className="text-[#D97706] font-mono">{apt.phone}</a>
                            {apt.email && ` · Email: ${apt.email}`}
                          </div>
                          <div className="text-slate-500 mt-1">Focus: {apt.serviceType}</div>
                          {apt.notes && <div className="text-slate-400 mt-0.5 italic">"{apt.notes}"</div>}
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                          <div className="font-mono font-semibold text-slate-800">
                            {apt.date} @ {apt.timeSlot}
                          </div>
                          <select
                            value={apt.status}
                            onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as any)}
                            className="px-2 py-1 bg-slate-100 rounded text-xs border border-slate-300 font-semibold"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enquiries Management Tab */}
              {activeTab === 'enquiries' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Customer Enquiries & Quote Requests ({enquiries.length})
                  </h3>

                  <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
                    {enquiries.map((enq) => (
                      <div key={enq.id} className="p-4 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm">{enq.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{enq.date}</span>
                        </div>
                        <div className="text-slate-600">
                          Phone: <a href={`tel:${enq.phone}`} className="text-[#D97706] font-mono font-semibold">{enq.phone}</a>
                          {enq.email && ` · ${enq.email}`}
                        </div>
                        <div className="font-semibold text-slate-800">{enq.subject}</div>
                        <p className="text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100 leading-relaxed">
                          {enq.message}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <a
                            href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(enq.name)}%2C%20thank%20you%20for%20contacting%20Classic%20Hardware.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 font-semibold hover:underline"
                          >
                            Reply on WhatsApp
                          </a>
                          <select
                            value={enq.status}
                            onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                            className="px-2 py-1 bg-slate-100 rounded text-xs border border-slate-300 font-semibold"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Management Tab */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Showroom Gallery Images ({gallery.length})
                    </h3>
                    <button
                      onClick={() => setShowGalleryForm(true)}
                      className="px-3 py-1.5 bg-[#17191E] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Gallery Image
                    </button>
                  </div>

                  {showGalleryForm && (
                    <form onSubmit={handleSaveGallery} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
                      <input
                        type="text"
                        required
                        placeholder="Image Title"
                        value={galTitle}
                        onChange={(e) => setGalTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      />
                      <select
                        value={galCategory}
                        onChange={(e) => setGalCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      >
                        <option value="Showroom">Showroom</option>
                        <option value="Door Fittings">Door Fittings</option>
                        <option value="Cabinet & Kitchen">Cabinet & Kitchen</option>
                        <option value="Locks & Security">Locks & Security</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Description"
                        value={galDesc}
                        onChange={(e) => setGalDesc(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowGalleryForm(false)}
                          className="px-3 py-1.5 text-xs text-slate-600 bg-slate-100 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-[#17191E] rounded-lg"
                        >
                          Add to Gallery
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {gallery.map((g) => (
                      <div key={g.id} className="bg-white border rounded-lg overflow-hidden group relative">
                        <SafeImage src={g.image} alt={g.title} className="w-full h-32 object-cover" />
                        <div className="p-2.5">
                          <div className="font-bold text-xs truncate">{g.title}</div>
                          <div className="text-[10px] text-slate-500">{g.category}</div>
                        </div>
                        <button
                          onClick={() => deleteGalleryItem(g.id)}
                          className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded shadow-sm opacity-90 hover:opacity-100"
                          title="Remove image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Website & Store Settings
                  </h3>

                  {settingsSaved && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Store settings updated and persisted successfully!
                    </div>
                  )}

                  <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Top Announcement Bar Text:
                      </label>
                      <input
                        type="text"
                        value={settingsAnnouncement}
                        onChange={(e) => setSettingsAnnouncement(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                      <label className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          checked={settingsActive}
                          onChange={(e) => setSettingsActive(e.target.checked)}
                        />
                        <span className="text-slate-600">Show announcement banner on top of website</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">
                          Phone Number (for click-to-call):
                        </label>
                        <input
                          type="text"
                          value={settingsPhone}
                          onChange={(e) => setSettingsPhone(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg font-mono"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">
                          Showroom Address:
                        </label>
                        <input
                          type="text"
                          value={settingsAddress}
                          onChange={(e) => setSettingsAddress(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">
                          Weekday Hours:
                        </label>
                        <input
                          type="text"
                          value={settingsWeekdays}
                          onChange={(e) => setSettingsWeekdays(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">
                          Sunday Hours:
                        </label>
                        <input
                          type="text"
                          value={settingsSunday}
                          onChange={(e) => setSettingsSunday(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#17191E] text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        Save Store Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
