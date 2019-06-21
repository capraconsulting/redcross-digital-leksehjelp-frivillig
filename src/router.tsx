import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeComponent, HeaderComponent as Header } from './components';
import { QuestionContainer, AnswerQuestionContainer } from './containers';
import { ChatSocket } from './components/ChatSocket';

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/questions" component={QuestionContainer} />
        <Route exact path="/messenger" component={ChatSocket}/>
        <Route
          path="/questions/:id"
          render={({ match }) => (
            <AnswerQuestionContainer id={match.params.id} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
