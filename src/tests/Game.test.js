import React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
import App from '../App';
import { playerGames, playersInfo }  from './mockAPI';
import { questionsResponse } from '../../cypress/mocks/questions';

const token = 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6';

const invalidTokenResponse = {
	"response_code": 3,
	"response_message": "Token Generated Successfully!",
	"token": "INVALID_TOKEN"
  }

describe('Teste tela Games', () => {
	afterEach(() => jest.clearAllMocks());
	test('Composição da tela', async () => {
		global.fetch = jest.spyOn(global, 'fetch');
	    global.fetch.mockResolvedValue({
    	  json: jest.fn().mockResolvedValue(questionsResponse),
    	});
		
		const { history } = renderWithRouterAndRedux(<Game />, playerGames, '/game');

		const timerShow = await screen.findByRole('heading', { name: /30/i });
		const questText = screen.getByTestId('question-text');
		
		const score = screen.getByRole('heading', {name: /Score:/i});
		const category = screen.getByTestId('question-category');
		const corAnswer = screen.getByTestId('correct-answer');
		const btns = screen.getAllByRole('button');
		
		expect(score).toBeInTheDocument();
		expect(category).toBeInTheDocument();
		expect(questText).toBeInTheDocument();
		expect(corAnswer).toBeInTheDocument();
		expect(btns[0]).toBeInTheDocument();
	});
	test('renderização de perguntas sem pré localStorage', async () => {
		global.fetch = jest.spyOn(global, 'fetch');
	    global.fetch.mockResolvedValue({
    	  json: jest.fn().mockResolvedValue(questionsResponse),
    	});
		
		const { history } = renderWithRouterAndRedux(<App />, playerGames, '/game');
		
		const btnCorrect = await screen.findByTestId('correct-answer');
		userEvent.click(btnCorrect);

		const btnNext = screen.getByTestId('btn-next');
		expect(btnNext).toBeInTheDocument();

		userEvent.click(btnNext);

		userEvent.click(btnCorrect);
		userEvent.click(screen.getByTestId('btn-next'));

		userEvent.click(btnCorrect);
		userEvent.click(screen.getByTestId('btn-next'));

		userEvent.click(btnCorrect);
		userEvent.click(screen.getByTestId('btn-next'));

		userEvent.click(btnCorrect);

		const btnNextEnd = screen.getByTestId('btn-next');
		expect(btnNextEnd).toBeInTheDocument();
		userEvent.click(btnNextEnd);
		expect(btnNextEnd).not.toBeInTheDocument();

		const { pathname } = history.location;
		expect(pathname). toBe('/feedback');
	});
	test('renderização de respostas com pré localStorage', async () => {
		global.localStorage.setItem('ranking', JSON.stringify(playersInfo.ranking));
		const spy = jest.spyOn(Object.getPrototypeOf
			(global.localStorage), 'getItem').mockImplementation(() => JSON.stringify(playersInfo.ranking));

		global.fetch = jest.spyOn(global, 'fetch');
	    global.fetch.mockResolvedValue({
    	  json: jest.fn().mockResolvedValue(questionsResponse),
    	});
		
		const { history } = renderWithRouterAndRedux(<App />, playerGames, '/game');
		
		const btnCorrect = await screen.findByTestId('correct-answer');
		userEvent.click(btnCorrect);

		const btnNext = screen.getByTestId('btn-next');
		expect(btnNext).toBeInTheDocument();

		userEvent.click(btnNext);

		userEvent.click(btnCorrect);
		userEvent.click(screen.getByTestId('btn-next'));

		userEvent.click(btnCorrect);
		userEvent.click(screen.getByTestId('btn-next'));

		userEvent.click(btnCorrect);
		userEvent.click(screen.getByTestId('btn-next'));

		userEvent.click(btnCorrect);

		const btnNextEnd = screen.getByTestId('btn-next');
		expect(btnNextEnd).toBeInTheDocument();
		userEvent.click(btnNextEnd);
		expect(btnNextEnd).not.toBeInTheDocument();

		const { pathname } = history.location;
		expect(pathname). toBe('/feedback');
	});
	test('timer', async () => {
		global.fetch = jest.spyOn(global, 'fetch');
	    global.fetch.mockResolvedValue({
    	  json: jest.fn().mockResolvedValue(questionsResponse),
    	});
		
		const { history } = renderWithRouterAndRedux(<App />, playerGames, '/game');

		const btnCorrect = await screen.findByTestId('correct-answer');

		jest.useFakeTimers();
    	jest.advanceTimersByTime(33000);
		
		const timerShow = await screen.findByTestId('timer-test');
		expect(btnCorrect).toBeDisabled;

		expect(timerShow).toBeInTheDocument();
	});
	test('Invalid token', async () => {
		global.fetch = jest.spyOn(global, 'fetch');
	    global.fetch.mockResolvedValue({
    	  json: jest.fn().mockResolvedValue(invalidTokenResponse),
    	});
		
		const { history } = renderWithRouterAndRedux(<App />, playerGames, '/game');

		const gravatarImg = screen.queryByTestId('header-profile-picture');

    	await waitForElementToBeRemoved(gravatarImg);

		const { pathname } = history.location;
    	expect(pathname).toBe('/');
	});
	test('test timer', async () => {
		global.fetch = jest.spyOn(global, 'fetch');
	    global.fetch.mockResolvedValue({
    	  json: jest.fn().mockResolvedValue(questionsResponse),
    	});
		
		const { history } = renderWithRouterAndRedux(<App />, playerGames, '/game');

		jest.useFakeTimers();
		jest.advanceTimersByTime(33000);

		const timerShow = await screen.findByTestId('timer-test');
		expect(timerShow).toBeInTheDocument();
	});
});