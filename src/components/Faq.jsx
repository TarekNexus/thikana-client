import React from "react";

const FAQ = () => {
  return (
    <div className="w-11/12 mx-auto py-10  pb-10 p-5">
     <div className="text-center mb-5">
         <h2 className="text-3xl font-extrabold text-[#00aeff] mb-3">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600  mx-auto">
        Find quick answers to common questions about using Thikana
      </p>
     </div>
      {/* FAQ Item 1 */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
        <input type="radio" name="faq-accordion" defaultChecked />
        <div className="collapse-title font-semibold">
          How do I create an account?
        </div>
        <div className="collapse-content text-sm">
          <p>Click the <span className="font-medium">"Sign Up"</span> button on the homepage and fill in your details to register as a user.</p>
        </div>
      </div>

      {/* FAQ Item 2 */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold">
          I forgot my password. What should I do?
        </div>
        <div className="collapse-content text-sm">
          <p>Click on <span className="font-medium">"Forgot Password"</span> on the login page. A reset link will be sent to your registered email.</p>
        </div>
      </div>

      {/* FAQ Item 3 */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold">
          How do I update my profile information?
        </div>
        <div className="collapse-content text-sm">
          <p>Go to <span className="font-medium">"My Profile"</span> from your dashboard and select <span className="font-medium">"Edit Profile"</span> to update your details.</p>
        </div>
      </div>

      {/* FAQ Item 4 */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold">
          How can I request an apartment agreement?
        </div>
        <div className="collapse-content text-sm">
          <p>Browse apartments, click <span className="font-medium">"Request Agreement"</span>, and wait for the admin/owner’s approval.</p>
        </div>
      </div>

      {/* FAQ Item 5 */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-3">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold">
          How do I make rent payments?
        </div>
        <div className="collapse-content text-sm">
          <p>Go to the <span className="font-medium">"Make Payment"</span> section in your dashboard. Payments are handled securely via Stripe.</p>
        </div>
      </div>

      {/* FAQ Item 6 */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold">
          Where can I see announcements from the building owner?
        </div>
        <div className="collapse-content text-sm">
          <p>Check the <span className="font-medium">"Announcements"</span> tab in your dashboard for the latest updates and notices.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
