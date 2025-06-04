import { Field, Slider } from "@chakra-ui/react";

type PriceCategorySliderProps = {
  priceCategory: number;
  setPriceCategory: (priceCategory: number) => void;
};
const PriceCategorySlider = (props: PriceCategorySliderProps) => {
  const { priceCategory, setPriceCategory } = props;
  return (
    <Field.Root orientation="horizontal">
      <Field.Label>Price Category</Field.Label>
      <Slider.Root
        value={[priceCategory]}
        onValueChange={(e) => setPriceCategory(e.value[0])}
        width="100%"
        step={1}
        max={3}
        thumbSize={{ width: 16, height: 16 }}
        variant="solid"
        colorPalette="orange"
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
          <Slider.Marks marks={priceCategoryMarks} />
        </Slider.Control>
      </Slider.Root>
    </Field.Root>
  );
};

const priceCategoryMarks = [
  { label: "Free", value: 0 },
  { label: "$", value: 1 },
  { label: "$$", value: 2 },
  { label: "$$$", value: 3 },
];

export default PriceCategorySlider;
