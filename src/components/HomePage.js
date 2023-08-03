import React from 'react';
import "./HomePage.css"

export const HomePage = () => {
  return (
    <div className="main-section">
      <header>
        <h1>Pam Davis</h1>
        <h2></h2>
      </header>

      <section>
        <h2>About Me</h2>
        <p>
          Hello, I'm Pam Davis, a therapist with a passion for helping people in their healing journey. I believe in
          providing a safe and supportive environment for my clients to explore their emotions, thoughts, and
          experiences.
        </p>
        <p>
          My approach to therapy is empathetic and client-centered. I tailor my therapeutic techniques to suit the
          unique needs and goals of each individual I work with. Whether you're dealing with anxiety, depression,
          trauma, or any other life challenges, I'm here to support you.
        </p>
      </section>

      <section>
        <h2>Credentials</h2>
        <p>
          I hold a degree in counseling from Vanderbilt University, and I am a certified therapist with additional training in Cognitive Behavioral Therapy (CBT), Mindfulness-Based Stress Reduction (MBSR), and Trauma-Focused Cognitive Behavioral Therapy (TF-CBT). I continue to update my skills and knowledge to provide the best possible support to my clients. My goal is to empower individuals in their healing journey and help them overcome challenges related to anxiety and depression effectively.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you're interested in therapy or have any questions, feel free to reach out to me. You can use the
          contact form below to send me a message. I'll get back to you as soon as possible.
        </p>

        <form action="mailto:Pam@GuidedResilience.com" method="post" encType="text/plain">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>

          <input type="submit" value="Submit" />
        </form>
      </section>


      <footer>
        &copy; {new Date().getFullYear()} Pam Davis. All rights reserved. | Contact: pam@guidedresilience.com
      </footer>
    </div>
  );
};


