import { useState } from 'react';
import useTalkStore from '../store/talkStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const TalkList = () => {
    const talks = useTalkStore(state => state.talks);
    const removeTalk = useTalkStore(state => state.removeTalk);
    const updateTalk = useTalkStore(state => state.updateTalk);
    const [selectedTalk, setSelectedTalk] = useState(null);
    const [talkToDelete, setTalkToDelete] = useState(null);
    const [presentateur, setPresentateur] = useState('');

    const filteredTalks = talks.filter(talk => 
        talk.presentateur.toLowerCase().includes(presentateur.toLowerCase())
    );

    const handleDelete = (talkId) => {
        removeTalk(talkId);
        setTalkToDelete(null);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateTalk(selectedTalk);
        setSelectedTalk(null);
    };

    return(
        <div className="container-fluid px-0">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Rechercher par présentateur..."
                            value={presentateur}
                            onChange={(e) => setPresentateur(e.target.value)}
                        />
                        {presentateur && (
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setPresentateur('')}
                            >
                                <i className="bi bi-x"></i>
                            </button>
                        )}
                    </div>
                    {presentateur && (
                        <div className="mt-2 text-muted">
                            {filteredTalks.length} talk{filteredTalks.length > 1 ? 's' : ''} trouvé{filteredTalks.length > 1 ? 's' : ''}
                        </div>
                    )}
                </div>
            </div>

            {talks.length === 0 ? (
                <div className="text-center p-3 p-md-4 bg-light rounded border">
                    <p className="text-muted mb-1">Aucun talk n'a été créé pour le moment.</p>
                    <p className="text-muted mb-0">Utilisez le formulaire pour ajouter un nouveau talk.</p>
                </div>
            ) : (
                <div className="row g-3 g-md-4">
                    {filteredTalks.sort((a, b) => a.title.localeCompare(b.title)).map(talk => (
                        <div key={talk.id} className="col-12 col-md-6 col-lg-10">
                            <div className={`card shadow-sm h-100 ${talk.status === 'termine' ? 'bg-secondary bg-opacity-50' : ''}`}>
                                <div className="card-body">
                                    <h3 className="card-title h5 mb-3">{talk.title}</h3>
                                    <p className="card-text mb-2">Sujet: {talk.sujet}</p>
                                    <p className="card-text mb-2">Présentateur: {talk.presentateur}</p>  
                                    <p className="card-text mb-2">Durée: {talk.duree} minutes</p>
                                    <p className="card-text mb-0">Statut: {talk.status}</p>
                                </div>
                                <div className="card-footer bg-transparent border-top d-flex justify-content-center gap-2">
                                    <button
                                        onClick={() => setSelectedTalk(talk)}
                                        className="btn btn-dark px-3 px-md-4"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editTalkModal"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => setTalkToDelete(talk)}
                                        className="btn btn-danger px-3 px-md-4"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteTalkModal"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="modal fade" id="editTalkModal" tabIndex="-1" aria-labelledby="editTalkModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editTalkModalLabel">Modifier le Talk</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedTalk && (
                                <form onSubmit={handleUpdate} className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label">Titre</label>
                                        <input
                                            type="text"
                                            value={selectedTalk.title}
                                            onChange={(e) => setSelectedTalk({...selectedTalk, title: e.target.value})}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Sujet</label>
                                        <input
                                            type="text"
                                            value={selectedTalk.sujet}
                                            onChange={(e) => setSelectedTalk({...selectedTalk, sujet: e.target.value})}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Présentateur</label>
                                        <input
                                            type="text"
                                            value={selectedTalk.presentateur}
                                            onChange={(e) => setSelectedTalk({...selectedTalk, presentateur: e.target.value})}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Durée (minutes)</label>
                                        <input
                                            type="number"
                                            value={selectedTalk.duree}
                                            onChange={(e) => setSelectedTalk({...selectedTalk, duree: e.target.value})}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Statut</label>
                                        <select
                                            value={selectedTalk.status}
                                            onChange={(e) => setSelectedTalk({...selectedTalk, status: e.target.value})}
                                            className="form-select"
                                        >
                                            <option value="en_attente">En attente</option>
                                            <option value="en_cours">En cours</option>
                                            <option value="termine">Terminé</option>
                                        </select>
                                    </div>
                                    <div className="col-12 d-flex justify-content-end gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            data-bs-dismiss="modal"
                                        >
                                            Enregistrer
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="deleteTalkModal" tabIndex="-1" aria-labelledby="deleteTalkModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteTalkModalLabel">Confirmer la suppression</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Êtes-vous sûr de vouloir supprimer le talk "{talkToDelete?.title}" ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={() => handleDelete(talkToDelete?.id)}
                                data-bs-dismiss="modal"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TalkList;



