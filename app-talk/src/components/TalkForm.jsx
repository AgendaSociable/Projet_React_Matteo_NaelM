import { useState } from 'react';
import useTalkStore from '../store/talkStore';

const TalkForm = () => {
    const [title, setTitle] = useState('');
    const [sujet, setSujet] = useState('');
    const [duree, setDuree] = useState('');
    const [presentateur, setPresentateur] = useState('');
    const [objectif, setObjectif] = useState('');
    const [status, setStatus] = useState('en_attente');

    const addTalk = useTalkStore(state => state.addTalk);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newTalk = {
            id: Date.now(),
            title,
            sujet,
            duree,
            presentateur,
            objectif,
            status
        };

        addTalk(newTalk);
        
        setTitle('');
        setSujet('');
        setDuree('');
        setPresentateur('');
        setObjectif('');
        setStatus('en_attente');
    };

    return (
        <div className="container-fluid px-0 d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="w-100 max-width-800">
                <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="title" className="form-label mb-2 text-center d-block">
                            Titre *
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control text-center"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="sujet" className="form-label mb-2 text-center d-block">
                            Sujet *
                        </label>
                        <input
                            type="text"
                            id="sujet"
                            value={sujet}
                            onChange={(e) => setSujet(e.target.value)}
                            className="form-control text-center"
                            required
                        />
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="duree" className="form-label mb-2 text-center d-block">
                            Durée (en minutes) *
                        </label>
                        <input
                            type="number"
                            id="duree"
                            value={duree}
                            onChange={(e) => setDuree(e.target.value)}
                            className="form-control text-center"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="presentateur" className="form-label mb-2 text-center d-block">
                            Présentateur *
                        </label>
                        <input
                            type="text"
                            id="presentateur"
                            value={presentateur}
                            onChange={(e) => setPresentateur(e.target.value)}
                            className="form-control text-center"
                            required
                        />
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-12">
                        <label htmlFor="objectif" className="form-label mb-2 text-center d-block">
                            Description
                        </label>
                        <textarea
                            id="objectif"
                            value={objectif}
                            onChange={(e) => setObjectif(e.target.value)}
                            className="form-control d-flex"
                            rows="3"
                            required
                        />
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="status" className="form-label mb-2 text-center d-block">
                            Statut
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="form-select text-center"
                        >
                            <option value="en_attente">En attente</option>
                            <option value="en_cours">En cours</option>
                            <option value="termine">Terminé</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                        >
                            Ajouter le Talk
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TalkForm;
