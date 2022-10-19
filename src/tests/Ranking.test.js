import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { playersInfo } from './mockAPI';

describe('Ranking testes', () => {
	test('Presença de componentes', () => {
		global.localStorage.setItem('ranking', JSON.stringify(playersInfo.ranking));
		const spy = jest.spyOn(Object.getPrototypeOf
			(global.localStorage), 'getItem').mockImplementation(() => JSON.stringify(playersInfo.ranking));

		const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');
		
		const title = screen.getByTestId('ranking-title');
		const btnHome = screen.getByTestId('btn-go-home');
		const playerImg = screen.getAllByRole('img');
		const playerName = screen.getAllByTestId('player-name-0');
		const playerScore = screen.getAllByTestId('player-score-0');

		expect(title).toBeInTheDocument();
		expect(btnHome).toBeInTheDocument();
		expect(playerImg[0]).toBeInTheDocument();
		expect(playerName[0]).toBeInTheDocument();
		expect(playerScore[0]).toBeInTheDocument();
	
		userEvent.click(btnHome);
		const { pathname } = history.location;
        expect(pathname).toBe('/');
		const local = JSON.parse(global.localStorage.getItem());
		expect(global.localStorage.getItem).toHaveBeenCalledWith('ranking');
		expect(global.localStorage.getItem).toHaveBeenCalled();
		expect(local).toHaveLength(2);
	});
});