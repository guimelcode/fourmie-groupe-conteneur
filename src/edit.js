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
import { Fragment } from "@wordpress/element";
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from "@wordpress/block-editor";
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	__experimentalSpacer as Spacer,
	CheckboxControl,
} from "@wordpress/components";
import BackgroundColorPalette from "./BackgroundColorPalette";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

/* custom varaibles */

const colonneRangeArray = [
	{
		value: 0,
		label: "0",
	},
	{
		value: 2,
		label: "1",
	},
	{
		value: 4,
		label: "4",
	},
	{
		value: 6,
		label: "6",
	},
	{
		value: 8,
		label: "8",
	},
	{
		value: 10,
		label: "10",
	},
	{
		value: 12,
		label: "12",
	},
	{
		value: 14,
		label: "14",
	},
	{
		value: 16,
		label: "16",
	},
	{
		value: 18,
		label: "18",
	},
	{
		value: 20,
		label: "20",
	},
	{
		value: 22,
		label: "22",
	},
	{
		value: 24,
		label: "24",
	},
];

/* custom functions */
const retirerEntreeObjet = (obj, targetKey) => {
	return Object.keys(obj)
		.filter((key) => key !== targetKey)
		.reduce((result, key) => {
			result[key] = obj[key];

			return result;
		}, {});
};

export default function Edit(props) {
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
		if (colWithStart) {
			classes += `col-${sizes.base}-start-${starts.base} `;

			for (const [key, value] of Object.entries(sizes)) {
				if (value && starts[key] && key !== "base") {
					classes += `col-${key}-${value}-start-${starts[key]} `;
				}
			}
		} else {
			classes += `col-${sizes.base} `;
			for (const [key, value] of Object.entries(sizes)) {
				if (value && key !== "base") {
					classes += `col-${key}-${value} `;
				}
				// console.log(`${key}: ${value}`);
			}
		}
		return classes;
	};

	/**
	 * Create Colonnage options
	 */
	const createColRangeControl = () => {
		let colRangeControl = [];
		for (const [key, value] of Object.entries(sizes)) {
			// console.log(sizes);
			if (key !== "base") {
				colRangeControl.push(
					<>
						<Spacer>
							<ToggleControl
								label={__(
									`Permettre le responsive pour les largeurs : ${key}`,
									"fourmi-e"
								)}
								help={value ? "Gestion permise." : "Pas de gestion."}
								checked={value}
								onChange={() => {
									setAttributes({
										colonnage: {
											...colonnage,
											sizes: {
												...sizes,
												[key]: value ? null : sizes.base,
											},
										},
									});
								}}
							/>
						</Spacer>
						{value && (
							<Spacer>
								<RangeControl
									label="Columns"
									help="Additional info about this."
									beforeIcon="arrow-down"
									afterIcon="arrow-up"
									step={1}
									icon="more"
									separatorType="none"
									trackColor="#0010AA"
									isShiftStepEnabled
									marks={colonneRangeArray}
									railColor="#3388EE"
									value={value}
									onChange={(newValue) =>
										setAttributes({
											colonnage: {
												...colonnage,
												sizes: {
													...sizes,
													[key]: newValue,
												},
											},
										})
									}
									min={1}
									max={24}
									withInputField={false}
								/>
							</Spacer>
						)}
					</>
				);
			}
		}
		return colRangeControl;
	};

	/**
	 * Create Starts Colonnage options
	 */

	const createStartColRangeControl = () => {
		let startColRangeControl = [];
		for (const [key, value] of Object.entries(starts)) {
			startColRangeControl.push(
				<>
					<Spacer>
						<ToggleControl
							label={__(
								`Permettre le décal pour les largeurs : ${key}`,
								"fourmi-e"
							)}
							help={value ? "Gestion permise." : "Pas de gestion."}
							checked={value}
							onChange={() => {
								setAttributes({
									colonnage: {
										...colonnage,
										starts: {
											...starts,
											[key]: value ? null : 1,
										},
									},
								});
							}}
						/>
					</Spacer>
					{value && (
						<Spacer>
							<RangeControl
								label="Columns"
								help="Additional info about this."
								beforeIcon="arrow-down"
								afterIcon="arrow-up"
								step={1}
								icon="more"
								separatorType="none"
								trackColor="#0010AA"
								isShiftStepEnabled
								marks={colonneRangeArray}
								railColor="#3388EE"
								value={value}
								onChange={(newValue) =>
									setAttributes({
										colonnage: {
											...colonnage,
											starts: {
												...starts,
												[key]: newValue,
											},
										},
									})
								}
								min={1}
								max={24}
								withInputField={false}
							/>
						</Spacer>
					)}
				</>
			);
		}
		return startColRangeControl;
	};
	return (
		<Fragment>
			<InspectorControls>
				{BackgroundColorPalette(props)}
				<PanelBody title="Options" initialOpen={true}>
					<Spacer>
						<ToggleControl
							label={__(
								"Permettre la gestion du déploiement des blocs suivant la largeur de la fenêtre",
								"fourmi-e"
							)}
							help={colWithResponsive ? "Gestion permise." : "Pas de gestion."}
							checked={colWithResponsive}
							onChange={() => {
								let temp_responseSizes = retirerEntreeObjet(sizes, "base");
								console.log(
									"🚀 ~ file: edit.js ~ line 219 ~ Edit ~ temp_responseSizes",
									temp_responseSizes
								);

								for (const [key, value] of Object.entries(temp_responseSizes)) {
									temp_responseSizes = { ...temp_responseSizes, [key]: null };
								}
								setAttributes({
									conditionnals: {
										...conditionnals,
										colWithResponsive: !colWithResponsive,
									},
									colonnage: {
										...colonnage,
										sizes: {
											...sizes,
											...temp_responseSizes,
										},
									},
								});
							}}
						/>
					</Spacer>
					<Spacer>
						<ToggleControl
							label={__(
								"Permettre le placement du début du colonnage",
								"fourmi-e"
							)}
							help={
								colWithStart
									? "Décalage possible."
									: "Positionnement suivant les éléments voisins."
							}
							checked={colWithStart}
							onChange={() => {
								setAttributes({
									conditionnals: {
										...conditionnals,
										colWithStart: !colWithStart,
									},
								});
							}}
						/>
					</Spacer>
					<Spacer>
						<ToggleControl
							label={__(
								"Permettre l'encombrement par rangée du bloc.",
								"fourmi-e"
							)}
							help={isRangee ? "Gestion possible." : "Rempli une rangée."}
							checked={isRangee}
							onChange={() => {
								setAttributes({
									conditionnals: {
										...conditionnals,
										isRangee: !isRangee,
									},
								});
							}}
						/>
					</Spacer>
					{isRangee && (
						<Spacer>
							<ToggleControl
								label={__(
									"Permettre la gestion du déploiement des rangée des blocs suivant la largeur de la fenêtre.",
									"fourmi-e"
								)}
								help={
									rangWithResponsive
										? "Gestion possible."
										: "Rempli une rangée."
								}
								checked={rangWithResponsive}
								onChange={() => {
									setAttributes({
										conditionnals: {
											...conditionnals,
											rangWithResponsive: !rangWithResponsive,
										},
									});
								}}
							/>
						</Spacer>
					)}
				</PanelBody>
				<PanelBody title="Colonnage" initialOpen={true}>
					<Spacer>
						<RangeControl
							label="Columns"
							help="Additional info about this."
							beforeIcon="arrow-down"
							afterIcon="arrow-up"
							step={1}
							icon="more"
							separatorType="none"
							trackColor="#0010AA"
							isShiftStepEnabled
							marks={colonneRangeArray}
							railColor="#3388EE"
							value={sizes.base}
							onChange={(newValue) =>
								setAttributes({
									colonnage: {
										...colonnage,
										sizes: {
											...colonnage.sizes,
											base: newValue,
										},
									},
								})
							}
							min={1}
							max={24}
							withInputField={false}
						/>
					</Spacer>
					{colWithResponsive && createColRangeControl()}
				</PanelBody>
				{colWithStart && (
					<PanelBody title="Décalage du colonnage" initialOpen={true}>
						{createStartColRangeControl()}
					</PanelBody>
				)}
			</InspectorControls>
			<div
				{...useBlockProps()}
				className={`${useBlockProps().className} ${constructColClass()} ${
					props.attributes.backgroundColorClass
				}`}
				style={{ backgroundColor: props.attributes.backgroundColor }}
			>
				<InnerBlocks />
			</div>
		</Fragment>
	);
}
