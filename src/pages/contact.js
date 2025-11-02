import React from 'react';
import Layout from '@theme/Layout';
import styles from './contact.module.css';

export default function Contact() {
  return (
    <Layout title="Contact — Sara Perez" description="Contact information for Sara Perez">
      <main className={styles.main}>
        <div className="container margin-vert--lg">
          <h1>Sara Perez</h1>
          <p>
            Full-Stack Software Engineer (HTML/CSS, JavaScript, React, Node.js)
            based in the San Francisco Bay Area.
          </p>

          <h2>Contact</h2>
          <ul>
            <li>Email: <a href="mailto:golbeksara@gmail.com">golbeksara@gmail.com</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/saragolbek" target="_blank" rel="noreferrer">www.linkedin.com/in/saragolbek</a></li>
          </ul>

          <h2>Summary</h2>
          <p>
            Thanks for stopping by my profile! I’m a Full-Stack Software
            Developer with a passion for creating robust web applications and
            dynamic software solutions. My toolbox is filled with skills ranging
            from HTML/CSS and JavaScript to advanced technologies like ReactJS and
            Node.js. I thrive in fast-paced environments and enjoy every phase of
            the Software Development Life Cycle.
          </p>

          <h2>Top Skills</h2>
          <ul>
            <li>Responsive Web Design</li>
            <li>React</li>
            <li>Express.js</li>
          </ul>

          <h2>Certifications & Education</h2>
          <ul>
            <li>Linux Essentials Certification</li>
            <li>ITIL 4 Foundation Certificate in IT Service Management</li>
            <li>B.S. Computer Science, Western Governors University</li>
          </ul>

          <h2>Experience</h2>
          <p>Open to opportunities. Current roles include Full Stack Engineer (since July 2023) and Elementary School Teacher (since 2024) — see LinkedIn for details.</p>
        </div>
      </main>
    </Layout>
  );
}
