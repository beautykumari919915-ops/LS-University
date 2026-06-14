import React, { useState } from 'react';
import { CreditCard, CheckCircle, Smartphone, Building } from 'lucide-react';
import { motion } from 'motion/react';

export default function FeePayment() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rollNumber: '',
    email: '',
    amount: '',
    semester: 'Semester 1'
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Online Fee Payment</h1>
          <p className="text-lg text-slate-600">Securely pay your academic and hostel fees online.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Progress Bar */}
          <div className="flex bg-slate-100 border-b border-slate-200">
            <div className={`flex-1 py-4 text-center text-sm font-bold ${step >= 1 ? 'bg-amber-500 text-slate-900' : 'text-slate-500'}`}>1. Student Details</div>
            <div className={`flex-1 py-4 text-center text-sm font-bold ${step >= 2 ? 'bg-amber-500 text-slate-900' : 'text-slate-500'}`}>2. Payment Gateway</div>
            <div className={`flex-1 py-4 text-center text-sm font-bold ${step >= 3 ? 'bg-amber-500 text-slate-900' : 'text-slate-500'}`}>3. Confirmation</div>
          </div>

          <div className="p-8">
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Student Roll Number</label>
                  <input
                    type="text"
                    required
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="e.g. CS2021001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="student@lsuniversity.edu.in"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Semester / Term</label>
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({...formData, semester: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option>Semester 1</option>
                      <option>Semester 2</option>
                      <option>Semester 3</option>
                      <option>Semester 4</option>
                      <option>Semester 5</option>
                      <option>Semester 6</option>
                      <option>Semester 7</option>
                      <option>Semester 8</option>
                      <option>Hostel Fee</option>
                      <option>Library Fine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Amount (INR)</label>
                    <input
                      type="number"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      placeholder="50000"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-slate-900 text-white text-lg font-bold rounded-lg hover:bg-slate-800 transition-colors flex justify-center items-center"
                >
                  {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Proceed to Pay"}
                </button>
              </form>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
                  <h3 className="font-bold text-slate-900 mb-2">Payment Summary</h3>
                  <div className="flex justify-between text-sm text-slate-600 mb-1"><span>Roll Number:</span> <span>{formData.rollNumber}</span></div>
                  <div className="flex justify-between text-sm text-slate-600 mb-1"><span>Fee Type:</span> <span>{formData.semester}</span></div>
                  <div className="flex justify-between text-lg font-bold text-slate-900 mt-4 pt-4 border-t border-slate-200"><span>Total Due:</span> <span>₹{formData.amount}</span></div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 mb-4">Select Payment Method (Test Mode)</h3>
                  
                  <label className="flex items-center p-4 border border-amber-500 bg-amber-50 rounded-lg cursor-pointer">
                    <input type="radio" name="paymentMethod" defaultChecked className="w-4 h-4 text-amber-500 focus:ring-amber-500" />
                    <CreditCard className="w-6 h-6 ml-3 text-slate-700" />
                    <span className="ml-3 font-medium text-slate-900">Credit / Debit Card</span>
                  </label>

                  <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="paymentMethod" className="w-4 h-4 text-amber-500 focus:ring-amber-500" />
                    <Smartphone className="w-6 h-6 ml-3 text-slate-700" />
                    <span className="ml-3 font-medium text-slate-900">UPI (GPay, PhonePe)</span>
                  </label>

                  <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="paymentMethod" className="w-4 h-4 text-amber-500 focus:ring-amber-500" />
                    <Building className="w-6 h-6 ml-3 text-slate-700" />
                    <span className="ml-3 font-medium text-slate-900">Net Banking</span>
                  </label>
                </div>

                <button
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full mt-8 py-4 bg-amber-500 text-slate-900 text-lg font-bold rounded-lg hover:bg-amber-400 transition-colors flex justify-center items-center"
                >
                  {loading ? <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div> : `Pay ₹${formData.amount}`}
                </button>
                <button onClick={() => setStep(1)} className="w-full mt-4 py-2 text-slate-500 font-medium hover:text-slate-800">
                  Cancel
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
                <p className="text-slate-600 mb-8">Thank you. Your fee payment of ₹{formData.amount} has been received.</p>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-left max-w-sm mx-auto mb-8">
                  <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Transaction ID:</span> <span className="font-mono font-medium">TXN{Math.floor(Math.random() * 100000000)}</span></div>
                  <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Date:</span> <span className="font-medium">{new Date().toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Roll Number:</span> <span className="font-medium">{formData.rollNumber}</span></div>
                </div>

                <button onClick={() => { setStep(1); setFormData({rollNumber: '', email: '', amount: '', semester: 'Semester 1'}) }} className="px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800">
                  Make Another Payment
                </button>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
