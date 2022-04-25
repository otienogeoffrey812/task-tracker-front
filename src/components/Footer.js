
import React from "react";
import moment from "moment-timezone";
import { Row, Col} from '@themesberg/react-bootstrap';

export default (props) => {
  const currentYear = moment().get("year");
  return (
    <div>
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={12} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-center">
              Copyright © {`${currentYear} `}
            </p>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
