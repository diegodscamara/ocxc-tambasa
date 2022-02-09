import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link';
import {t} from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const TmbFooterMenu = props => {
  const {
    firstColumnName,
    secondColumnName,
    thirdColumnName,
    fourthSectionTitle,
    fourthSectionItem1,
    fourthSectionLink1,
    fourthSectionText1,
    fourthSectionItem2,
    fourthSectionLink2,
    fourthSectionText2,
    fourthSectionItem3,
    fourthSectionLink3,
    fourthSectionText3
  } = props;

  const {
    displaySection1 = '[]',
    displaySection2 = '[]',
    displaySection3 = '[]',
  } = props;

  const links1 = JSON.parse(displaySection1.replace(/'/g, '"'));
  const links2 = JSON.parse(displaySection2.replace(/'/g, '"'));
  const links3 = JSON.parse(displaySection3.replace(/'/g, '"'));

  const CreateLink = props => {
    const {href, children} = props;
    let linkProps = {href, displayName: children};

    if(href.includes("http"))
      linkProps = { ...linkProps, target: "_blank" }

    return <Link {...linkProps }></Link>
  };

  const Phone = () => {
    return (
      <a href={`tel:${fourthSectionLink1 || ''}`}>{fourthSectionText1}</a>
    );
  };

  const Mailto = ({ email, subject, body, children}) => {
    return (
      <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
      );
  };

  return (
    <Styled id="TmbFooterMenu" css={css}>
      <div className="TmbFooterMenu">
        <div className="TmbFooterMenu__Border">
          <div className="TmbFooterMenu__Section">
            <div className="TmbFooterMenu__Section-Border">
              <div className="TmbFooterMenu__Title">
                <h3 className="TmbFooterMenu__Title-Border">{firstColumnName}</h3>
              </div>
              <nav className="LinksList">
                <ul className="TmbFooterMenu__List">
                  {links1.map((item, index) => (
                    <li className="TmbFooterMenu__Item" key={index}>
                      <CreateLink href={item['1']}>{props[item['0']] || item['0']}</CreateLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="TmbFooterMenu__Section">
            <div className="TmbFooterMenu__Section-Border TmbFooterMenu__No-Border">
              <div className="TmbFooterMenu__Title">
                <h3 className="TmbFooterMenu__Title-Border">{secondColumnName}</h3>
              </div>
              <nav className="LinksList">
              <ul className="TmbFooterMenu__List">
                  {links2.map((item, index) => (
                    <li className="TmbFooterMenu__Item" key={index}>
                      <CreateLink href={item['1']}>{props[item['0']] || item['0']}</CreateLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="TmbFooterMenu__Section">
            <div className="TmbFooterMenu__Section-Border">
              <div className="TmbFooterMenu__Title">
                <h3 className="TmbFooterMenu__Title-Border">{thirdColumnName}</h3>
              </div>
              <nav className="LinksList">
              <ul className="TmbFooterMenu__List">
                  {links3.map((item, index) => (
                    <li className="TmbFooterMenu__Item" key={index}>
                      <CreateLink href={item['1']}>{props[item['0']] || item['0']}</CreateLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="TmbFooterMenu__Section">
            <div className="TmbFooterMenu__Section-Border Remove__Border">
              <div className="TmbFooterMenu__Title">
                <h3 className="TmbFooterMenu__Title-Border">{fourthSectionTitle}</h3>
              </div>
              <nav className="LinksList Spacing">
                <span className="TmbFooterMenu__Item">{t(fourthSectionItem1)}</span>
                <Phone className="TmbFooterMenu__Item" />
                <span className="TmbFooterMenu__Item">{fourthSectionItem2}</span>
                <Link className="TmbFooterMenu__Item" route={fourthSectionLink2}>
                  {fourthSectionText2}
                </Link>
                <span className="TmbFooterMenu__Item">{fourthSectionItem3}</span>
                <Mailto email={fourthSectionLink3 || ''} subject="" body="">
                  {fourthSectionText3}
                </Mailto>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default TmbFooterMenu;
