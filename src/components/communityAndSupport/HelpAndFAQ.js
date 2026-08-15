import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const faqs = [
  { id: 1, q: "How do I save my data structure?", a: "You must be logged in. Use the Save button inside the tutorial to persist your structure to your profile." },
  { id: 2, q: "What's the best way to ask for help?", a: "Include code snippets, expected vs actual behavior, and steps to reproduce." },
  { id: 3, q: "How do I report a bug?", a: "Open a post in the community with the 'bug' tag, or contact support." },
];

const HelpAndFAQ = () => {
  return (
    <div>
      <h5 className="mb-3">Help & FAQ</h5>
      <Accordion defaultActiveKey="0">
        {faqs.map((f, idx) => (
          <Accordion.Item eventKey={`${idx}`} key={f.id}>
            <Accordion.Header>{f.q}</Accordion.Header>
            <Accordion.Body>{f.a}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default HelpAndFAQ;
