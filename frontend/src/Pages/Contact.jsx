import { Contact } from 'lucide-react';
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    text: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.subject) {
      alert('Please fill all the required fields!');
      return;
    }

    try {
      const response = await fetch('https://zyre-1.onrender.com/api/contacts/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert(result.message);
      console.log('response', result);
    } catch (error) {
      console.error('error submitting form:', error);
    }
  };

  return (
   <div id="contact" className="bg-gray-100 pt-20 px-5 lg:px-36">
  <div className="text-center space-y-6">
    <h1 className="font-bold text-2xl lg:text-4xl text-black font-serif">Fashion Meets Conversation

</h1>
    <p className="text-sm lg:text-lg text-gray-600 font-body">
Whether you have a question, feedback, or just want to talk style  we’re all ears. Let’s connect and make your fashion experience unforgettable.    </p>
  </div>

  <form
    onSubmit={handleSubmit}
    className="flex flex-col items-center gap-6 lg:gap-8 pt-8 pb-4 w-full lg:max-w-3xl mx-auto"
  >
    {/* Input Field Style */}
    {['name', 'email', 'mobile', 'subject'].map((field) => (
      <input
        key={field}
        type={field === 'email' ? 'email' : 'text'}
        name={field}
        value={formData[field]}
        onChange={handleInputChange}
        placeholder={`Enter your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
        className="w-full py-3 px-4 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md text-gray-800 font-body shadow-sm transition duration-200"
        required
      />
    ))}

    <textarea
      name="text"
      value={formData.text}
      onChange={handleInputChange}
      placeholder="Write your message here..."
      className="w-full py-3 px-4 h-28 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md text-gray-800 font-body shadow-sm resize-none transition duration-200"
    />

    <button
      type="submit"
      className="py-2 px-6 lg:py-3 lg:px-8 font-body bg-gray-800 rounded-full shadow-md hover:bg-black text-white font-semibold transition duration-300"
    >
      Submit
    </button>
  </form>
</div>

  );
};

export default ContactPage;
