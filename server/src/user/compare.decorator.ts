import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export function Compare(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: 'Compare',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: CompareConstraint,
        });
    };
}

@ValidatorConstraint({name: 'Compare'})
export class CompareConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

   defaultMessage(args: ValidationArguments) {
     const [relatedPropertyName] = args.constraints;
     return `${relatedPropertyName} and ${args.property} do not match`;
  }
}