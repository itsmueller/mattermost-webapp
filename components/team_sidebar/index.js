// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTeams} from 'mattermost-redux/actions/teams';
import {withRouter} from 'react-router-dom';

import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {getMyTeams, getCurrentTeamId} from 'mattermost-redux/selectors/entities/teams';

import {getIsLhsOpen} from 'selectors/lhs';

import {moreTeamsToJoin} from './selectors';
import TeamSidebar from './team_sidebar_controller.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);

    const experimentalPrimaryTeam = config.ExperimentalPrimaryTeam;
    const enableTeamCreation = config.EnableTeamCreation === 'true';

    return {
        currentTeamId: getCurrentTeamId(state),
        isOpen: getIsLhsOpen(state),
        experimentalPrimaryTeam,
        enableTeamCreation,
        teams: getMyTeams(state),
        moreTeams: moreTeamsToJoin(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getTeams,
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamSidebar));
