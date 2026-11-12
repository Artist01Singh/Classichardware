import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  GalleryItem,
  Review,
  Appointment,
  Enquiry,
  BusinessConfig,
  INITIAL_BUSINESS_CONFIG,
  INITIAL_PRODUCTS,
  INITIAL_GALLERY,
  INITIAL_REVIEWS,
  INITIAL_FAQS
} from '../data/initialData';
import { resolveImageSrc } from '../assets/imageRegistry';

export interface CartItem {
  product: Product;
  quantity: number;
  finish?: string;
}

interface StoreContextType {
  business: BusinessConfig;
  updateBusiness: (config: Partial<BusinessConfig>) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  appointments: Appointment[];
  bookAppointment: (apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => { success: boolean; message: string };
  updateAppointmentStatus: (id: string, status: 'Confirmed' | 'Pending' | 'Completed') => void;
  enquiries: Enquiry[];
  submitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: 'New' | 'Contacted' | 'Closed') => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, finish?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  faqs: { question: string; answer: string }[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Business Config
  const [business, setBusiness] = useState<BusinessConfig>(() => {
    const saved = localStorage.getItem('ch_business_config');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESS_CONFIG;
  });

  // Products (migrate default item images & legacy paths to bundled URLs)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ch_products_v2') || localStorage.getItem('ch_products');
    if (!saved) return INITIAL_PRODUCTS;
    try {
      const parsed: Product[] = JSON.parse(saved);
      const initialById = new Map(INITIAL_PRODUCTS.map(p => [p.id, p.image]));
      return parsed.map(p => ({
        ...p,
        image: initialById.get(p.id) || resolveImageSrc(p.image)
      }));
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Gallery (use v2 default gallery or resolve bundled URLs)
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const savedV2 = localStorage.getItem('ch_gallery_v2');
    if (!savedV2) return INITIAL_GALLERY;
    try {
      const parsed: GalleryItem[] = JSON.parse(savedV2);
      const initialById = new Map(INITIAL_GALLERY.map(g => [g.id, g.image]));
      return parsed.map(g => ({
        ...g,
        image: initialById.get(g.id) || resolveImageSrc(g.image)
      }));
    } catch {
      return INITIAL_GALLERY;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('ch_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('ch_appointments');
    return saved ? JSON.parse(saved) : [
      {
        id: "apt-101",
        name: "Ar. Meera Kapoor",
        phone: "09811234567",
        email: "meera.kapoor@archstudio.in",
        serviceType: "Architectural Door & Lock Consultation",
        date: "2026-11-15",
        timeSlot: "11:00 AM",
        notes: "Bring finish samples for ongoing 4BHK apartment project in sector 42.",
        status: "Confirmed",
        createdAt: "2026-11-10T14:30:00Z"
      }
    ];
  });

  // Enquiries
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('ch_enquiries');
    return saved ? JSON.parse(saved) : [
      {
        id: "enq-201",
        name: "Devendra Verma",
        phone: "09876543210",
        email: "d.verma@highriseconstructions.com",
        subject: "Bulk Project Quote for 48 Mortise Locksets",
        message: "Need competitive rates for 48 heavy-duty euro mortise locks and matching brushed brass levers. Please provide technical spec sheet.",
        items: [
          { id: "prod-1", name: "Knurled Brass Architectural Lever Handle Set", quantity: 48 },
          { id: "prod-3", name: "Heavy-Duty Euro Profile Mortise Lock Body & Brass Cylinder", quantity: 48 }
        ],
        date: "2026-11-11",
        status: "New"
      }
    ];
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ch_cart');
    if (!saved) return [];
    try {
      const parsed: CartItem[] = JSON.parse(saved);
      const initialById = new Map(INITIAL_PRODUCTS.map(p => [p.id, p.image]));
      return parsed.map(item => ({
        ...item,
        product: {
          ...item.product,
          image: initialById.get(item.product.id) || resolveImageSrc(item.product.image)
        }
      }));
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ch_admin_auth') === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ch_business_config', JSON.stringify(business));
  }, [business]);

  useEffect(() => {
    localStorage.setItem('ch_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ch_gallery_v2', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('ch_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('ch_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('ch_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('ch_cart', JSON.stringify(cart));
  }, [cart]);

  const updateBusiness = (config: Partial<BusinessConfig>) => {
    setBusiness(prev => ({ ...prev, ...config }));
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProd,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: "Just now"
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const bookAppointment = (apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    // Check clash: same date and timeSlot
    const clash = appointments.find(
      a => a.date === apt.date && a.timeSlot === apt.timeSlot && a.status !== 'Completed'
    );
    if (clash) {
      return {
        success: false,
        message: `The time slot ${apt.timeSlot} on ${apt.date} is already reserved. Please select another slot.`
      };
    }

    const newApt: Appointment = {
      ...apt,
      id: `apt-${Date.now()}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [newApt, ...prev]);
    return {
      success: true,
      message: `Your showroom consultation for ${apt.date} at ${apt.timeSlot} has been successfully confirmed!`
    };
  };

  const updateAppointmentStatus = (id: string, status: 'Confirmed' | 'Pending' | 'Completed') => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const submitEnquiry = (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => {
    const newEnq: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setEnquiries(prev => [newEnq, ...prev]);
  };

  const updateEnquiryStatus = (id: string, status: 'New' | 'Contacted' | 'Closed') => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, finish?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.finish === finish);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.finish === finish
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, finish: finish || product.finishes[0] }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginAdmin = (password: string) => {
    // Default master password 'admin123' or 'classic2026'
    if (password === 'admin123' || password === 'classic2026' || password === 'admin') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('ch_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('ch_admin_auth');
  };

  return (
    <StoreContext.Provider
      value={{
        business,
        updateBusiness,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        reviews,
        addReview,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        enquiries,
        submitEnquiry,
        updateEnquiryStatus,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        faqs: INITIAL_FAQS
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
