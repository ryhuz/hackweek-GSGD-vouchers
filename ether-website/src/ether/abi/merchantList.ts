export const _abi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "admin",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32",
			},
		],
		name: "RoleAdminChanged",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleGranted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleRevoked",
		type: "event",
	},
	{
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
		],
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "merchantAddress",
				type: "address",
			},
		],
		name: "hasOnboarded",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "merchantAddress",
				type: "address",
			},
		],
		name: "offboard",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "merchantAddress",
				type: "address",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
		],
		name: "onboard",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4",
			},
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
