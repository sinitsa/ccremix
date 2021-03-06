import {z} from 'zod';
import {JsonValue} from 'type-fest';

export type SchemaFor<T> = z.ZodType<T, z.ZodTypeDef, T>;

type MethodsInit<Schema extends SchemaFor<JsonValue>> = Record<
	string,
	(value: z.infer<Schema>) => unknown
>;

export function zodFunc<Schema extends SchemaFor<JsonValue>, Methods extends MethodsInit<Schema>>(
	schema: Schema,
	// Nice hack to show readible error messages
	methods: Methods extends Record<'_data', unknown>
		? 'You cannot call a method _data. Please rename _data to something else! _data is reserved for accessing the parsed result.' &
				never
		: Methods
) {
	return (raw: unknown) => {
		const result = schema.safeParse(raw) as z.infer<Schema>;

		type Res = {
			[Key in keyof Methods]: () => ReturnType<Methods[Key]>;
		};

		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const value: Res = {} as Res;

		for (const key in methods) {
			if (!(key in methods)) {
				continue;
			}

			const method = methods[key];

			value[key] = () => method(result.data) as ReturnType<Methods[typeof key]>;
		}

		return {
			...value,
            _success: result.success,
			_data: result.data,
            _error: result.error.format()
		};
	};
}

export default zodFunc;