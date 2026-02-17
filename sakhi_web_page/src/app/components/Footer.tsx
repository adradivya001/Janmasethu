import { motion } from 'motion/react';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Sakhi</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your compassionate AI companion for emotional support through fertility, pregnancy, and parenting journeys.
            </p>
            <p className="text-xs text-gray-500">
              A janmasethu.com initiative
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#home" className="hover:text-purple-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#knowledge-hub" className="hover:text-purple-400 transition-colors">
                  Knowledge Hub
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-purple-400 transition-colors">
                  Treatments
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-purple-400 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#faq" className="hover:text-purple-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-purple-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-purple-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-purple-400" />
                <span>support@janmasethu.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-purple-400" />
                <span>+91 XXX XXX XXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-purple-400" />
                <span>Bangalore, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 janmasethu.com. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="hover:text-purple-400 transition-colors">
                Privacy
              </a>
              <a href="#terms" className="hover:text-purple-400 transition-colors">
                Terms
              </a>
              <a href="#disclaimer" className="hover:text-purple-400 transition-colors">
                Medical Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            <strong className="text-gray-400">Important:</strong> Sakhi provides emotional support and general guidance only. 
            It is not a substitute for professional medical advice, diagnosis, or treatment. 
            Always seek the advice of your physician or qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
    </footer>
  );
}
