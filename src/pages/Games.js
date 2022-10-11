import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { scoreAct } from '../Redux/actions';
import '../App.css';

class Games extends React.Component {
  state = {
    questions: {},
    score: 0,
    assertions: 0,
    nQuestion: 0,
    isLoading: true,
    timer: 30,
    showAnswer: false,
    disabled: false,
    response: false,
  };

  async componentDidMount() {
    this.callQuestionsApi();
    const second = 1000;
    const time = 2000;
    setTimeout(() => {
      const update = setInterval(() => {
        this.setState((prev) => {
          if (prev.timer === 1) {
            clearInterval(update);
            this.setState({
              disabled: true,
            });
          }
          return { timer: prev.timer - 1 };
        });
      }, second);
    }, time);
  }

  /*   componentDidUpdate(prevProps, prevState) {
    const { timer } = this.state;
    if (!prevState.timer === timer && timer === 0);
  } */

  callQuestionsApi = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const FIVE = 5;
    const THREE = 3;
    const url = `https://opentdb.com/api.php?amount=${FIVE}&token=${token}`;
    let response;
    try {
      const data = await fetch(url);
      response = await data.json();
      if (response.response_code === THREE) {
        throw error;
      }
    } catch (error) {
      console.error('Expired Token, please re-send request in login');
      history.push('/');
    }
    const newAnswers = this.randomAnswers(response);
    this.setState({ questions: newAnswers, isLoading: false });
  };

  randomAnswers = (response) => {
    const FIVE = 5;
    const TWO = 2;
    let ans = [];
    response.results.forEach((res) => {
      if (res.type === 'multiple') {
        const randomN = Math.floor(Math.random() * FIVE);
        ans = [...res.incorrect_answers];
        ans.splice(randomN, 0, res.correct_answer);
      } else {
        const randomN = Math.floor(Math.random() * TWO);
        ans = [...res.incorrect_answers];
        ans.splice(randomN, 0, res.correct_answer);
      }
      res.newAnswers = ans;
    });
    return response;
  };

  handleClickIncorrect = () => {
    this.setState(() => ({
      /* nQuestion: prev.nQuestion + 1, */
      showAnswer: true,
      response: true,
    }));
  };

  handleClickCorrect = (difficulty) => {
    const { timer /* score, assertions */ } = this.state;
    // const { dispatch } = this.props;
    let levelDif;
    const THREE = 3;
    if (difficulty === 'hard') {
      levelDif = THREE;
    } else if (difficulty === 'medium') {
      levelDif = 2;
    } else {
      levelDif = 1;
    }
    const TEN = 10;
    const plusScore = TEN + (timer * levelDif);
    this.setState((prevState) => ({
      assertions: prevState.assertions + 1,
      score: prevState.score + plusScore,
      showAnswer: true,
      response: true,
    }), this.registerScoreAndAssertions);
  };

  registerScoreAndAssertions = () => {
    const { score, assertions } = this.state;
    const { dispatch } = this.props;
    const payload = {
      score,
      assertions,
    };
    dispatch(scoreAct(payload));
  };

  nextQuestion = () => {
    const { nQuestion } = this.state;
    const FOUR = 4;
    const { history } = this.props;
    this.setState((prev) => ({
      nQuestion: prev.nQuestion + 1,
      response: false,
      timer: 30,
    }));
    if (nQuestion === FOUR) {
      history.push('/feedback');
    }
  };

  render() {
    const { questions,
      nQuestion,
      isLoading,
      score,
      timer,
      showAnswer,
      disabled,
      response } = this.state;
    return (
      <div>

        <Header />
        <h1>Trivia</h1>
        <h2>
          Score:
          {score}
        </h2>
        {
          (!isLoading) && (
            <div>
              <h3 data-testid="question-category">
                {questions?.results[nQuestion].category}
              </h3>
              <h4 data-testid="question-text">
                {questions?.results[nQuestion].question}
              </h4>
              <div data-testid="answer-options">
                {
                  questions?.results[nQuestion].newAnswers.map((elem, index) => (
                    (questions.results[nQuestion].incorrect_answers
                      .some((e) => e === elem)) ? (
                        <button
                          key={ index }
                          {
                            ...(showAnswer
                          && response && { style: { border: '3px solid red' } })
                          }
                          className="incorrect-unColor"
                          type="button"
                          data-testid={ `wrong-answer-${index}` }
                          onClick={ this.handleClickIncorrect }
                          disabled={ disabled }
                        >
                          {elem}
                        </button>
                      ) : (
                        <button
                          key={ index }
                          {
                            ...(showAnswer
                          && response
                          && { style: { border: '3px solid rgb(6, 240, 15)' } })
                          }
                          className="correct-unColor"
                          type="button"
                          disabled={ disabled }
                          data-testid="correct-answer"
                          onClick={ () => this
                            .handleClickCorrect(questions
                              .results[nQuestion].difficulty) }
                        >
                          {elem}
                        </button>
                      )
                  ))
                }
              </div>
              {
                (response) && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.nextQuestion }
                  >
                    Next
                  </button>
                )
              }
              <h3>
                {timer}
              </h3>
            </div>
          )
        }
      </div>
    );
  }
}

Games.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Games);
