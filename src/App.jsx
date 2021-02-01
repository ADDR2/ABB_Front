import React from 'react';  
import MainRouter from './routers/Main';
import { toast, ToastContainer } from 'react-toastify';
import infiniteTimer from './helpers/InfiniteTimer';
import 'react-toastify/dist/ReactToastify.css';

// styles
import './App.scss';

const App = () => {
    React.useEffect(
        () => {
            let timer = null;
            infiniteTimer(timer, 10000, () => {
                toast.info(
                    'A new part has been produced!. Click here to see more details :)',
                    {
                        onClick: () => {
                            window.open(`/piece/${Math.floor(Math.random()*1000) + 1}`, '_blank');
                        }
                    }
                );
            });

            return () => {
                timer && clearTimeout(timer);
            };
        },
        []
    );

    return (
        <div className="abb-app-container">
            <MainRouter />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                limit={4}
                pauseOnFocusLoss={false}
                pauseOnHover
            />
        </div>
    );
};

export default App;
