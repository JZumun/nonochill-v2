const modes = Object.freeze({
	INIT: 0,
	GAME_SETUP: 1,
	GAME_READY: 1.5,
	CREATOR: 2,
	CREATOR_READY: 2.5
});

const isin = (...arr) => mode => arr.includes(mode);

export const isGameMode = isin(modes.GAME_SETUP, modes.GAME_READY);
export const isCreatorMode = isin(modes.CREATOR, modes.CREATOR_READY);
export default modes;
