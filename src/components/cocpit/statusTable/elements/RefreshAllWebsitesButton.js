import React from 'react';

import {
    Button
} from 'reactstrap';

import * as Actions from 'actions/Actions';
import SiteDataStore from 'stores/SiteDataStore';

class RefreshAllWebsitesButton extends React.Component {

    constructor() {
        super();
        this.state = {
            isRefreshing: false
        }
        this.updateData = this.updateData.bind(this);
        this.unlockButton = this.unlockButton.bind(this);
    }

    componentWillMount() {
        SiteDataStore.on('change', this.unlockButton);
    }

    componentWillUnmount() {
        SiteDataStore.removeListener('change', this.unlockButton);
    }

    unlockButton() {
        localStorage.removeItem('updatingAllSites');
        this.setState({
            isRefreshing: false
        });
    }

    updateData() {
        this.setState({
            isRefreshing: true
        });
        localStorage.setItem('updatingAllSites', true);
        Actions.updateAllSitesStatus();
    }

    render() {
        const isRefreshing = this.state.isRefreshing;

        return (
            <div>
                <Button color='info' size='sm' onClick={() => this.updateData()} disabled={isRefreshing || localStorage.getItem('updatingAllSites') ? true : false}>
                    {
                        isRefreshing || localStorage.getItem('updatingAllSites') ? (
                            <span>
                                <div><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Trwa odświeżanie...</div>
                            </span>
                        ) : (
                                <span><i className='fa fa-refresh' aria-hidden='true'></i> Odśwież wszystko</span>
                            )
                    }
                </Button>
                {
                    isRefreshing || localStorage.getItem('updatingAllSites') ? (
                        <div className={'loading-msg'}>
                            <div><i className='fa fa-2x fa-spinner fa-spin' aria-hidden='true'></i><br />
                                Trwa odświeżanie wszystkich witryn...<br /><small>Proszę czekać</small>
                                <p><i className={'fa fa-exclamation-triangle'}></i> Czas potrzebny na wykonanie pełnego odświeżenia<br />jest zależny od liczby monitorowanych stron.</p>
                            </div>
                        </div>) : ''
                }
            </div>
        );
    }
}

RefreshAllWebsitesButton.propTypes = {
}

export default RefreshAllWebsitesButton;