import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Validation Error', 'Please complete your name, email, and inquiry message.');
      return;
    }
    setSubmitted(true);
    showToast('Inquiry Received', 'Thank you. A concierge officer will contact you within 4 hours.');
  };

  const boutiques = [
    {
      city: 'Mumbai Flagship',
      area: 'Bandra West',
      address: '42 Atelier Boulevard, Turner Road, Bandra West, Mumbai 400050',
      phone: '+91 (022) 2640 8900',
      hours: 'Mon - Sun: 11:00 AM – 8:30 PM'
    },
    {
      city: 'New Delhi Boutique',
      area: 'Khan Market',
      address: '18 Middle Lane, Khan Market, New Delhi 110003',
      phone: '+91 (011) 4350 7100',
      hours: 'Mon - Sun: 10:30 AM – 8:00 PM'
    },
    {
      city: 'Bengaluru Atelier',
      area: 'Indiranagar',
      address: '512 100 Feet Road, Defense Colony, Indiranagar, Bengaluru 560038',
      phone: '+91 (080) 4120 9500',
      hours: 'Mon - Sun: 11:00 AM – 8:30 PM'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-semibold">CONCIERGE & BOUTIQUES</span>
        <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#202020]">
          Connect With Maison Nove
        </h1>
        <p className="text-xs sm:text-sm text-[#202020]/75 font-sans-body leading-relaxed">
          Whether inquiring about private styling appointments, custom garment alterations, or press features, our team is at your service.
        </p>
      </div>

      {/* Flagship Boutiques Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {boutiques.map(b => (
          <div key={b.city} className="bg-white p-6 border border-[#E6E1D7] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6E1D7] pb-3">
              <h3 className="font-serif-heading text-xl font-bold text-[#202020]">{b.city}</h3>
              <span className="text-[10px] uppercase tracking-wider text-[#202020]/60 bg-[#F7F5F0] px-2 py-1 font-medium">{b.area}</span>
            </div>

            <div className="space-y-2.5 text-xs text-[#202020]/80 font-sans-body">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#202020] shrink-0 mt-0.5" />
                <span>{b.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#202020] shrink-0" />
                <span className="font-mono">{b.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={15} className="text-[#202020] shrink-0" />
                <span>{b.hours}</span>
              </div>
            </div>

            <button 
              onClick={() => showToast('Appointment Requested', `Concierge alert sent to ${b.city}. We will call to confirm.`)}
              className="w-full mt-2 bg-[#F7F5F0] hover:bg-[#202020] hover:text-[#F7F5F0] text-[#202020] text-xs font-semibold uppercase tracking-wider py-2.5 border border-[#E6E1D7] transition-all"
            >
              BOOK PRIVATE STYLING
            </button>
          </div>
        ))}
      </div>

      {/* Form & Direct Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-8 sm:p-12 border border-[#E6E1D7]">
        
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#202020]/60 font-semibold">DIRECT CHANNELS</span>
          <h2 className="font-serif-heading text-2xl font-bold text-[#202020]">Send Us a Message</h2>
          <p className="text-xs text-[#202020]/75 leading-relaxed font-sans-body">
            Our client support advisors are available Monday through Saturday, 9:00 AM to 7:00 PM IST.
          </p>

          <div className="space-y-4 pt-2 text-xs font-sans-body">
            <div className="flex items-center gap-3 p-3 bg-[#F7F5F0]">
              <Mail size={18} className="text-[#202020]" />
              <div>
                <span className="text-[10px] uppercase text-[#202020]/60 block font-medium">Concierge Email</span>
                <span className="font-mono font-medium text-[#202020]">concierge@maisonnove.com</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#F7F5F0]">
              <Phone size={18} className="text-[#202020]" />
              <div>
                <span className="text-[10px] uppercase text-[#202020]/60 block font-medium">Toll Free Hotline (India)</span>
                <span className="font-mono font-medium text-[#202020]">1800-266-9080</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="bg-[#F7F5F0] p-8 border border-[#E6E1D7] text-center space-y-4 py-16">
              <h3 className="font-serif-heading text-2xl font-bold text-[#202020]">Inquiry Submitted</h3>
              <p className="text-xs text-[#202020]/80 font-sans-body max-w-sm mx-auto">
                Thank you for reaching out to MAISON NOVE. A personal client advisor will review your request and get back to you shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)} 
                className="bg-[#202020] text-[#F7F5F0] text-xs uppercase tracking-wider px-6 py-3 font-semibold hover:bg-[#3D3D3D]"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">Your Full Name *</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">Email Address *</label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ananya@example.com"
                    className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">Phone Number</label>
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">Subject</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Sizing Advice">Sizing & Fit Advice</option>
                    <option value="Styling Appointment">Private Styling Appointment</option>
                    <option value="Order Support">Existing Order Support</option>
                    <option value="Press Feature">Press & Media Feature</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#202020] uppercase tracking-wider block mb-1">Message *</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How may our atelier assist you today?"
                  className="w-full bg-[#F7F5F0] text-[#202020] text-xs p-3 border border-[#E6E1D7] focus:outline-none focus:border-[#202020]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#202020] hover:bg-[#3D3D3D] text-[#F7F5F0] py-3.5 text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors"
              >
                <Send size={15} />
                <span>SUBMIT INQUIRY TO CONCIERGE</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
