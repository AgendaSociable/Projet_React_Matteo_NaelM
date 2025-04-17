import './App.css'
import TalkForm from './components/TalkForm';
import useTalkStore from './store/talkStore';
import TalkList from './components/TalkList';

function App() {
  const talks = useTalkStore(state => state.talks);
  return (
    <div className="min-vh-100 bg-light pt-5">
      <div className="py-4">
        <div className="container-fluid container-lg mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <div className="card border-0 rounded-4 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-4">
                    <h2 className="h5 mb-0">Nouveau Talk</h2>
                    <span className="badge bg-dark ms-2">Nouveau</span>
                  </div>
                  <TalkForm />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="card border-0 rounded-4 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-4">
                    <h2 className="h5 mb-0">Liste des Talks</h2>
                    <span className="badge bg-dark ms-2">{talks.length} talks</span>
                  </div>
                  <TalkList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
