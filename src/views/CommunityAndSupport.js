// import React from 'react';

// const CommunityAndSupport = () => {
//     return (
//         <div>
//             <h1>Community & Support</h1>
//             <p>Forums, Live Chat, FAQ, and other community resources will be available here.</p>
//             {/* Implement forum list, live chat, etc., as needed */}
//         </div>
//     );
// };

// export default CommunityAndSupport;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CommunityFeed from '../components/communityAndSupport/CommunityFeed';
import HelpAndFAQ from '../components/communityAndSupport/HelpAndFAQ';
import SupportContact from '../components/communityAndSupport/SupportContact';

const CommunityAndSupport = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} lg={8}>
          <CommunityFeed />
        </Col>
        <Col xs={12} lg={4} className="mt-4 mt-lg-0">
          <HelpAndFAQ />
          <SupportContact />
        </Col>
      </Row>
    </Container>
  );
};

export default CommunityAndSupport;
