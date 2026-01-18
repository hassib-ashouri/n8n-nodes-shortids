import { NodeConnectionTypes, type INodeType, type INodeTypeDescription, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
// eslint-disable-next-line @n8n/community-nodes/no-restricted-imports
import { nanoid } from 'nanoid';

export class ShortIds implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Short ID Generator',
		name: 'shortIds',
		icon: { light: 'file:../../icons/id.svg', dark: 'file:../../icons/id.dark.svg' },
		group: ['input'],
		version: 1,
		description: 'Generate url friendly and short uuids. This is useful when creating short urls. It is based on nonoid library.',
		defaults: {
			name: 'Generate Short ID',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		properties: [
			{ displayName: "ID Property Name", name: "idPropertyName", type: "string", default: "shortId", required: true, description: "The name of the property to store the short ID in" },
			{ displayName: "ID Length", name: "idLength", type: "number", default: 21, required: true, description: "The length of the short ID. Defaulted to 21 to have a collision probablity similar to UUIDv4.", typeOptions: { minValue: 1, numberPrecision: 0 } }
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const inputItems = this.getInputData();
		const returnData = [];
		const idLength = this.getNodeParameter('idLength', 0) as number;
		const idPropertyName = this.getNodeParameter('idPropertyName', 0) as string;
		for (const eachItem of inputItems) {
			const shortId = nanoid(idLength);
			eachItem.json[idPropertyName] = shortId;
			returnData.push(eachItem);
		}
		return [returnData];
	}
}
