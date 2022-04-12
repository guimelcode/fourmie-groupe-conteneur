/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const {
		attributes: { conditionnals, colonnage },
		setAttributes,
	} = props;

	const { colWithResponsive, colWithStart, isRangee, rangWithResponsive } =
		conditionnals;

	const { sizes, starts } = colonnage;

	/**
	 * Construire les classes pour le colonnage
	 */
	const constructColClass = () => {
		let classes = "";
		classes += `col-${sizes.base} `;

		for (const [key, value] of Object.entries(sizes)) {
			if (value && key !== "base") {
				classes += `col-${key}-${value} `;
			}
			console.log(`${key}: ${value}`);
		}
		return classes;
	};
	return (
		<div
			{...useBlockProps.save()}
			className={`${useBlockProps.save().className} ${constructColClass()} ${
				props.attributes.backgroundColorClass
			}`}
		>
			<InnerBlocks.Content />
		</div>
	);
}
