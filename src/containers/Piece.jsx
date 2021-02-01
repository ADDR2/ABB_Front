import React from 'react';
import dataGenerator from '../helpers/DataGenerator';

// COMPONENTS
import Feature from '../components/Feature';

// STYLES
import '../styles/Piece.scss';

const PieceContainer = () => {
    const windowWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth
    ;

    const [ isLoading, changeLoadingState ] = React.useState(true);
    const [ data, changeData ] = React.useState([]);
    const [ pieceWidth, changePieceWidth ] = React.useState(windowWidth);

    React.useEffect(
        () => {
            changeData(dataGenerator());
            changeLoadingState(false);
        },
        []
    );

    React.useEffect(
        () => {
            function handleResize() {
                const windowWidth = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth
                ;
        
                changePieceWidth(windowWidth);
            }

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        },
        []
    );

    if (isLoading || !data || !data.length) return <div className="loader">...Loading</div>

    if (pieceWidth >= 647) {
        return (
            <div className="piece-container">
                <Feature
                    className="piece-feature"
                    {...data[0]}
                />
                <div className="feature-group">
                    <Feature
                        className="piece-feature"
                        useHalfHeight
                        {...data[1]}
                    />
                    <Feature
                        className="piece-feature"
                        useHalfHeight
                        {...data[2]}
                    />
                </div>
                <div className="feature-group">
                    <Feature
                        className="piece-feature"
                        useHalfHeight
                        {...data[3]}
                    />
                    <Feature
                        className="piece-feature"
                        useHalfHeight
                        {...data[4]}
                    />
                </div>
                <Feature
                    className="piece-feature"
                    {...data[5]}
                />
            </div>
        );
    }

    return (
        <div className="piece-container">
            {
                data.map((feature, index) => (
                    <Feature
                        key={`feature-${index}`}
                        className="piece-feature"
                        {...feature}
                        useHalfHeight={index !== 0 && index !== data.length - 1}
                    />
                ))
            }
        </div>
    );
};

export default PieceContainer;