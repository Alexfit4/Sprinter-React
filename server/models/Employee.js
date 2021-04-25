import mongoose from "mongoose";
const { Schema } = mongoose;

function slugify(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to = "aaaaeeeeiiiioooouuuunc------";
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return str;
}
const employeeSchema = mongoose.Schema(
	{
		first_name: {
			type: String,
		},
		last_name: {
			type: String,
		},
		slug: {
			type: String
		},
		role: {
			type: Schema.Types.ObjectId,
			ref: "Roles",
		},
		createdAt: {
			type: Date,
			default: new Date(),
		},
	},
	{
		toJSON: {
			// include any virtual properties when data is requested
			virtuals: true,
		},
	}
);

employeeSchema.pre('save', function () {
	//? Slugify the title, if there is no title it wont reach here
	this.slug = slugify(this.first_name + this.last_name)
})

const EmployeeSchema = mongoose.model("EmployeeSchema", employeeSchema);

export default EmployeeSchema;
