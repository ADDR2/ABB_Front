import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';

// ICONS
import WhiteCheck from '../assets/svgs/white-check.svg';
import WhiteCross from '../assets/svgs/white-cross.svg';
import WhiteExclamation from '../assets/svgs/white-exclamation.svg';
import GreenCheck from '../assets/svgs/green-check.svg';
import RedCross from '../assets/svgs/red-cross.svg';
import YellowExclamation from '../assets/svgs/yellow-exclamation.svg';

// STYLES
import '../styles/Feature.scss'

const whiteIcons = [
    WhiteExclamation,
    WhiteCheck,
    WhiteCross
];

const colorIcons = [
    YellowExclamation,
    GreenCheck,
    RedCross
];

const stateClasses = [
    'warning',
    'success',
    'error'
];

const FEATURE_HEADER_HEIGHT = 50;
const FEATURE_TABLE_HEADER_HEIGHT = 47;
const FEATURE_VERTICAL_PADDING = 20;
const FEATURE_SEPARATOR_PADDING = 5;
const FEATURE_WIDTH = 300;
const FEATURE_FORBIDDEN_SPACE = FEATURE_HEADER_HEIGHT + FEATURE_TABLE_HEADER_HEIGHT + FEATURE_VERTICAL_PADDING;

const FeatureComponent = ({ name, state, data = [], useHalfHeight = false, className = '', style = {} }) => {
    const windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight
    ;
    const [ bodyHeight, changeBodyHeight ] = React.useState(
        useHalfHeight
        ? (
            ((windowHeight - FEATURE_VERTICAL_PADDING) / 2) -
            FEATURE_HEADER_HEIGHT -
            (FEATURE_SEPARATOR_PADDING/2) -
            FEATURE_TABLE_HEADER_HEIGHT
        )
        : (windowHeight - FEATURE_FORBIDDEN_SPACE)
    );
    const availableWindowSpace = windowHeight - FEATURE_VERTICAL_PADDING;

    React.useEffect(
        () => {
            function handleResize() {
                const windowHeight = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight
                ;

                if (useHalfHeight) {
                    const newBodySpace = ((windowHeight - FEATURE_VERTICAL_PADDING) / 2) -
                        FEATURE_HEADER_HEIGHT -
                        (FEATURE_SEPARATOR_PADDING/2) -
                        FEATURE_TABLE_HEADER_HEIGHT
                    ;

                    changeBodyHeight(newBodySpace);
                } else {
                    changeBodyHeight(
                        windowHeight - FEATURE_FORBIDDEN_SPACE
                    );
                }
            }

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        },
        [ useHalfHeight ]
    );

    return (
        <div
            className={`feature-container ${className}`}
            style={style}
        >
            <div className={`feature-header ${stateClasses[state]}`}>
                <h2 className="feature-title">
                    { name }
                </h2>

                <img
                    alt={name}
                    src={whiteIcons[state]}
                    className={`feature-icon ${stateClasses[state]}`}
                ></img>
            </div>

            <div
                className="feature-table"
                style={{ height: `${
                        useHalfHeight
                        ? (availableWindowSpace / 2) - FEATURE_HEADER_HEIGHT - (FEATURE_SEPARATOR_PADDING/2)
                        : (bodyHeight + FEATURE_TABLE_HEADER_HEIGHT)
                    }px`
                }}
            >
                <div className="feature-table-header">
                    <h4
                        className="feature-table-column"
                        style={{ width: '55px' }}
                    >
                        Control
                    </h4>
                    <h4
                        className="feature-table-column"
                        style={{ width: '30px' }}
                    >
                        Dev
                    </h4>
                    <h4
                        className="feature-table-column"
                        style={{ width: '85px' }}
                    >
                        Dev Out Tol
                    </h4>
                </div>

                <div className="feature-table-body">
                    <List
                        className="feature-table-virtual-scroller"
                        height={bodyHeight}
                        itemCount={data.length}
                        itemData={data}
                        itemSize={FEATURE_TABLE_HEADER_HEIGHT}
                        width={FEATURE_WIDTH}
                    >
                        {
                            ({ index, style }) => (
                                <div
                                    key={`feature-${index}`}
                                    className="feature-table-row"
                                    style={style}
                                >
                                    <p
                                        className="feature-table-cell"
                                        style={{ width: '55px' }}
                                    >
                                        { data[index].control }
                                    </p>
                                    <p
                                        className="feature-table-cell"
                                        style={{ width: '30px' }}
                                    >
                                        { data[index].dev }
                                    </p>
                                    <p
                                        className="feature-table-cell"
                                        style={{ width: '85px' }}
                                    >
                                        { data[index].devOut }
                                    </p>
                                    <img
                                        alt={data[index].control}
                                        src={colorIcons[data[index].state]}
                                        className={`feature-icon-cell ${stateClasses[data[index].state]}`}
                                    ></img>
                                </div>
                            )
                        }
                    </List>
                </div>
            </div>
        </div>
    );
};

const rowStandardValueType = PropTypes.shape(
    {
        control: PropTypes.string.isRequired,
        dev: PropTypes.number.isRequired,
        devOut: PropTypes.number.isRequired,
        state: PropTypes.oneOf([0, 1, 2]).isRequired
    }
);

FeatureComponent.propTypes = {
    name: PropTypes.string.isRequired,
    state: PropTypes.oneOf([0, 1, 2]).isRequired,
    data: PropTypes.arrayOf(rowStandardValueType).isRequired,
    useHalfHeight: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
};

export default FeatureComponent;