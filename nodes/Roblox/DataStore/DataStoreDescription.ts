import type { INodeProperties } from 'n8n-workflow';

export const dataStoreOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['data_Store'],
			},
		},
		options: [
			{
				name: 'Get DataStores',
				value: 'get_dataStores',
				description: 'Get all data stores',
				action: 'Get datastores',
				routing: {
					request: {
						method: 'GET',
						url: '=/cloud/v2/universes/{{ $parameter["universeId"] }}/data-stores',
						headers: {
							'x-api-key': '={{ $credentials.apiKey }}',
						},
					},
				},
			},
			{
				name: 'Get DataStore Store Entry',
				value: 'get_dataStore_store_entry',
				description: 'Get data from a data store - store',
				action: 'Get datastore store entry',
				routing: {
					request: {
						method: 'GET',
						url: '=/cloud/v2/universes/{{ $parameter["universeId"] }}/data-stores/{{ $parameter["dataStore_id"] }}/entries/{{ $parameter["entry_id"] }}',
						headers: {
							'x-api-key': '={{ $credentials.apiKey }}',
						},
					},
				},
			},

			{
				name: 'Update DataStore Store Entry',
				value: 'update_dataStore_store_entry',
				description: 'Update data from a data store - store',
				action: 'Update datastore store entry',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/cloud/v2/universes/{{ $parameter["universeId"] }}/data-stores/{{ $parameter["dataStore_id"] }}/entries/{{ $parameter["entry_id"] }}',
						headers: {
							'x-api-key': '={{ $credentials.apiKey }}',
							'Content-Type': 'application/json',
						},

						body: {
							value: '={{ $parameter["json_payload"] }}',
							etag: '={{ $json.etag }}',
						},
					},
				},
			},
		],
		default: 'get_operation',
	},
];

export const dataStoreFields: INodeProperties[] = [
	{
		displayName: 'Universe Id',
		name: 'universeId',
		type: 'string',
		default: '',
		required: true,
		description: 'The path of the universe id to retrieve datastore info for',
		displayOptions: {
			show: {
				resource: ['data_Store'],
				operation: ['get_dataStores', 'get_dataStore_store_entry', 'update_dataStore_store_entry'],
			},
		},
	},

	{
		displayName: 'DataStore Id',
		name: 'dataStore_id',
		type: 'string',
		default: '',
		required: true,
		description: 'The datastore id of the datastore you want to access.',
		displayOptions: {
			show: {
				resource: ['data_Store'],
				operation: ['get_dataStores', 'get_dataStore_store_entry', 'update_dataStore_store_entry'],
			},
		},
	},

	{
		displayName: 'Entry Id',
		name: 'entry_id',
		type: 'string',
		default: '',
		required: true,
		description: 'The entry id of the entry you want to access.',
		displayOptions: {
			show: {
				resource: ['data_Store'],
				operation: ['get_dataStore_store_entry', 'update_dataStore_store_entry'],
			},
		},
	},

	{
		displayName: 'End Date',
		name: 'end_date',
		type: 'string',
		default: '',
		required: true,
		description: 'The end date for an event or timer',
		displayOptions: {
			show: {
				resource: ['data_Store'],
				operation: [],
			},
		},
	},

	{
		displayName: 'JSON Payload',
		name: 'json_payload',
		type: 'json',
		default: {},
		required: true,
		description: 'Payload of data',
		displayOptions: {
			show: {
				resource: ['data_Store'],
				operation: ['update_dataStore_store_entry'],
			},
		},
	},
];
