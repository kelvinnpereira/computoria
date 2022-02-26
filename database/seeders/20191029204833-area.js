'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('area', [
			{
				id: 1,
				nome: 'Ciências Exatas',
				created_at: new Date(new Date()+"+0"),
				updated_at: new Date(new Date()+"+0"),
			},
			{
				id: 2,
				nome: 'Ciências Humanas',
				created_at: new Date(new Date()+"+0"),
				updated_at: new Date(new Date()+"+0"),
			},
			{
				id: 3,
				nome: 'Ciências Biológicas',
				created_at: new Date(new Date()+"+0"),
				updated_at: new Date(new Date()+"+0"),
			},
		], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('area', {}, {});
	}
};
