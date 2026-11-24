import type { Story } from './types';

export const story: Story = {
  title: 'Punamulta',
  subtitle: "Five years of hyperspectral imaging on Finland's rock paintings",
  byline: 'Astuvansalmi · Saraakallio · Värikallio · 2021–2026',
  footer:
    'Data: Rock Paintings project, University of Eastern Finland. Map: MapLibre GL, OpenFreeMap.',
  coverImage: '/images/cover.jpg',
  theme: 'dark',
  showMarkers: false,
  markerColor: '#c8452a',
  chapters: [
    {
      id: 'finland',
      kicker: 'Finland · 136 sites',
      alignment: 'left',
      title: 'Red ochre on lakeside rock',
      description:
        'Finland has 136 confirmed prehistoric rock painting sites. Nearly all are on steep lakeside cliffs, painted with red ochre between about 7000 and 3000 years ago, from a boat or from the winter ice. Elk, people, boats and hand prints. Most are faint; many are almost gone.',
      location: { center: [24.5, 63.4], zoom: 5.1, pitch: 0, bearing: 0 },
      mapAnimation: 'flyTo',
      onChapterEnter: [
        { layer: 'finland-sites', opacity: 1 },
        { layer: 'sites', opacity: 0 },
        { layer: 'sites-label', opacity: 0 },
      ],
    },
    {
      id: 'three-sites',
      kicker: 'The sites',
      alignment: 'left',
      narrow: true,
      title: 'Three sites, one camera',
      photoMarkers: [
        {
          siteId: 'astuvansalmi',
          src: '/images/astuvansalmi-2021.jpg',
          label: 'Astuvansalmi, Mikkeli',
          anchor: 'bottom',
        },
        {
          siteId: 'saraakallio',
          src: '/images/saraakallio-cliff.jpg',
          label: 'Saraakallio, Laukaa',
          anchor: 'bottom',
        },
        {
          siteId: 'varikallio',
          src: '/images/varikallio-wall.jpg',
          label: 'Värikallio, Hossa',
          anchor: 'top',
        },
      ],
      description:
        'This story follows three sites, 600 km apart from south to north. The same hyperspectral camera visited all three between 2021 and 2025.',
      hint: 'Hover a site on the map to peek, click it to jump to its chapter.',
      location: { center: [25.0, 63.3], zoom: 5.5, pitch: 0, bearing: 0 },
      mapAnimation: 'flyTo',
      onChapterEnter: [
        { layer: 'finland-sites', opacity: 0.35 },
        { layer: 'sites', opacity: 1 },
        { layer: 'sites-label', opacity: 0 },
      ],
    },
    {
      id: 'team',
      kicker: 'The team · UEF Joensuu',
      alignment: 'left',
      title: 'Researchers and data collectors',
      images: [
        {
          src: '/images/dmitry-hossa-2024.jpg',
          alt: 'Dmitry Semenov in a hooded jacket on the frozen lake at Hossa',
          caption: 'Dmitry Semenov, research manager, Computational Spectral Imaging. Hossa 2024.',
          focus: '50% 30%',
        },
        {
          src: '/images/veikko-astuvansalmi-2025.jpg',
          alt: 'Veikko Miettinen walking through the forest to Astuvansalmi with a camera monopod',
          caption: 'Veikko Miettinen, project coordinator, VR/XR lab. Astuvansalmi 2025.',
          focus: '50% 25%',
        },
      ],
      description:
        'The project is run from the University of Eastern Finland in Joensuu. Dmitry Semenov leads the spectral imaging and analysis. Veikko Miettinen coordinates the project and the field work: panoramas, 3D capture and logistics. Students carry the rest: a master’s thesis on spectral unmixing in 2024, another on machine-learning segmentation in 2025.',
      location: { center: [29.7407, 62.6047], zoom: 9.5, pitch: 0, bearing: 0 },
      mapAnimation: 'flyTo',
      onChapterEnter: [{ layer: 'lab', opacity: 1 }],
    },
    {
      id: 'astuvansalmi',
      kicker: 'Astuvansalmi · Ristiina',
      alignment: 'left',
      title: 'Astuvansalmi, Ristiina',
      images: [
        {
          src: '/images/astuvansalmi-elk.jpg',
          alt: 'Red ochre elk painted on the Astuvansalmi cliff',
          caption: 'An elk, the most common animal on Finnish rock paintings.',
          focus: '70% 50%',
        },
        {
          src: '/images/astuvansalmi-cliff-moss.jpg',
          alt: 'Weathered Astuvansalmi cliff face with faint red figures, moss and lichen',
          caption: 'Lichen, moss and water streaks slowly taking the panel back.',
          focus: '45% 50%',
        },
      ],
      description:
        'A cliff on Yövesi, part of Lake Saimaa, whose profile is said to resemble a human head. Archaeologist Pekka Sarvas documented the paintings in 1968. About 80 figures are known: elk, people, boats, hand prints and a woman with a bow, in at least three shades of red. When they were painted, roughly 5000 years ago, the lake stood up to 18 m higher and the painters worked from boats or ice. Today the panel is high above the shore, reached by a 3 km forest trail.',
      location: { center: [27.54414, 61.44415], zoom: 12.2, pitch: 0, bearing: 15 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'astuvansalmi-2021',
      kicker: 'Astuvansalmi · first capture',
      date: '2021-11',
      alignment: 'left',
      title: 'Astuvansalmi, 2 November 2021',
      images: [
        {
          src: '/images/astuvansalmi-2021.jpg',
          alt: 'Red ochre elk and human figures on the Astuvansalmi cliff',
          caption: 'Elk, people and a hand on the main panel.',
        },
        {
          src: '/images/astuvansalmi-cliff-moss.jpg',
          alt: 'Weathered Astuvansalmi cliff face with faint red figures, moss and lichen',
          caption:
            'Moss, lichen and water streaks over faint figures. Nature works against the paint.',
          focus: '45% 50%',
        },
        {
          src: '/images/hyperspectral-cube.svg',
          alt: 'Diagram of a hyperspectral cube: 204 band images stacked by wavelength, one pixel giving a reflectance curve',
          caption:
            'What one capture holds: 204 images, one per wavelength. Every pixel is a curve.',
        },
      ],
      description:
        'The first field capture. A grey November day on the Yövesi shore. A Specim IQ hyperspectral camera recorded 29 image cubes, each with 204 bands between 400 and 1000 nm, starting with a white reference tile placed on the rock. Two weeks earlier the team had measured the cloudy-sky spectrum outside the university to know what November light would give them.',
      location: { center: [27.5439, 61.4442], zoom: 13.5, pitch: 0, bearing: -30 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'spectra',
      kicker: 'Method · spectra',
      alignment: 'full',
      title: 'What the camera sees',
      images: [
        {
          src: '/images/spectra.svg',
          alt: 'Line chart of reflectance from 250 to 2500 nm for ochre on rock, bare rock and two lab ochre recipes',
          caption:
            'Reflectance measured with a Lambda 1050 spectrophotometer. Field samples 12 and 13 from 2025, lab recipes from 2023.',
        },
      ],
      description:
        'A normal photo stores three values per pixel. The Specim IQ stores 204, one per wavelength band, so every pixel is a curve. Red ochre is iron oxide: the lab paints absorb blue and green, then climb steeply from about 550 nm and level off near 750 nm. On real rock the signal is weaker and the bare granite also rises, but at a different rate and from a different level. That difference in curve shape is what the analysis uses to estimate how much of each pixel is ochre and how much is rock. The dips at 1.4 and 1.9 µm are water absorption, outside the camera’s range.',
      location: { center: [27.54414, 61.44415], zoom: 14.5, pitch: 60, bearing: 40 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'astuvansalmi-2025',
      kicker: 'Astuvansalmi · return',
      date: '2025-09',
      alignment: 'left',
      title: 'Astuvansalmi, 22–23 September 2025',
      images: [
        {
          src: '/images/astuvansalmi-2025-rig.jpg',
          alt: 'Camera mount on a long pole at Astuvansalmi, September 2025',
          caption: 'Three cameras on a long pole, walked along the whole cliff for the 3D scan.',
          focus: '50% 40%',
        },
        {
          src: '/images/astuvansalmi-2025-panel.jpg',
          alt: 'Astuvansalmi panel photographed for the GigaPan panorama',
          caption: 'One of 170 frames for the GigaPan panorama, 22 September 2025.',
          focus: '50% 50%',
        },
      ],
      description:
        'Four years later, the whole site in one day. A GigaPan robotic head photographed the cliff in seven overlapping groups of frames for a gigapixel panorama. Rami Saarikorpi of 360Finland walked the cliff with a Matterport scanner on a pole for a measured 3D model. The Specim IQ returned to the unclear areas, a DSLR covered the rest. Three hours in, three possible new figures had been found. The drone stayed in its case: too much wind over Yövesi.',
      location: { center: [27.54414, 61.44415], zoom: 14, pitch: 0, bearing: -60 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'digital-twin',
      kicker: 'Astuvansalmi · digital twin',
      date: '2025-10',
      alignment: 'center',
      title: 'A digital twin of the cliff',
      description:
        'Everything captured on site is uploaded the same day and fused into one model: panorama, spectral cubes and 3D geometry in a single coordinate frame, so any colour measurement can be placed on the rock to the centimetre. With game-engine tools the water of Saimaa can be raised to its prehistoric level, to see the panel the way the painters saw it from the water. The paint itself cannot be sampled or dated, but figures at the same height, or in the same shade of red, may belong to the same period. The model also makes the cliff visitable by VR headset in a museum, and preserves a record of what weather may take in the next thousand years.',
      location: { center: [27.54414, 61.44415], zoom: 12.5, pitch: 0, bearing: 120 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'lab-2023',
      kicker: 'Joensuu · lab',
      date: '2023-05',
      alignment: 'right',
      title: 'Joensuu, 9–12 May 2023',
      image: '/images/lab-2023.jpg',
      description:
        'Before reading real paint, make some. In the UEF photonics lab, red ochre pigment was mixed with blood, water, whole egg, egg white, egg yolk and butter, then brushed onto local stones. Some samples were washed to imitate centuries of rain. The Specim IQ imaged them, a Lambda 1050 spectrophotometer measured each recipe from 250 to 2500 nm, and PCA and clustering tested whether binder and weathering leave a measurable trace. This became the reference library for every field cube that followed.',
      location: { center: [29.7407, 62.6047], zoom: 14.5, pitch: 50, bearing: 20 },
      mapAnimation: 'flyTo',
      onChapterEnter: [
        { layer: 'lab', opacity: 1 },
        { layer: 'sites-label', opacity: 1 },
      ],
    },
    {
      id: 'thesis-2024',
      kicker: 'Joensuu · thesis',
      date: '2024-08',
      alignment: 'left',
      title: 'Spectral unmixing of Finnish rock art, 2024',
      images: [
        {
          src: '/images/thesis-lab-rock.jpg',
          alt: 'Dark rock slab with a grid of fifteen small red paint squares',
          caption:
            'Rock 1: fifteen 1 cm squares, three Uula iron-oxide pigments in blood, butter, egg yolk, egg white or all three.',
          focus: '50% 50%',
        },
        {
          src: '/images/thesis-bow-raw.jpg',
          alt: 'The bow-woman figure at Astuvansalmi, raw photograph',
          caption: 'The study region at Astuvansalmi: a woman with a bow, as the eye sees it.',
          focus: '35% 50%',
        },
        {
          src: '/images/thesis-bow-dstretch.jpg',
          alt: 'The same figure after DStretch enhancement, red on cyan',
          caption: 'Same frame after DStretch. Photos by Pekka Honkakoski.',
          focus: '35% 50%',
        },
      ],
      description:
        'Yasmina Djelil’s master’s thesis, IMLEX programme, August 2024, supervised by Dmitry Semenov, Veikko Miettinen and Michiteru Kitazaki. The question: can a hyperspectral pixel be decomposed into pure signatures, called endmembers, and a share of each? In the lab, three red pigments in five binders were painted on two rocks and scanned with a Specim V10E line scanner, 120 bands. In the field, the bow-woman panel at Astuvansalmi was imaged with the Specim IQ, 204 bands, from a tall tripod in changing light. Five endmember extraction methods and five unmixing models, every combination scored.',
      location: { center: [29.7407, 62.6047], zoom: 13, pitch: 45, bearing: -30 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'thesis-2024-results',
      kicker: 'Astuvansalmi · thesis results',
      date: '2024-08',
      alignment: 'right',
      title: 'Two endmembers are enough',
      images: [
        {
          src: '/images/thesis-endmembers.png',
          alt: 'Spectra of two manually picked pixels from the Astuvansalmi cube, paint in blue and rock in orange',
          caption:
            'Endmembers picked by hand from the field cube: paint in blue, rock in orange. The spike near 780 nm never got explained.',
        },
        {
          src: '/images/thesis-result.jpg',
          alt: 'Abundance map of the bow-woman panel and a red reconstruction of the paint over the rock',
          caption:
            'Best field result: background endmember from PCA and bilinear unmixing, and the panel reconstructed in Python.',
        },
      ],
      description:
        'In the lab the answer was clean. With just two endmembers, red pigment and rock, every painted square was separated from the stone regardless of pigment or binder. Manual extraction with fully constrained least squares in −log(R) space scored best, RMSE 0.08, matching Valero and colleagues’ results on aged paintings. In the field the data was harder: sun and cloud alternated, the panel was too high to frame well, and most abundance maps showed the bow-woman only faintly. Four combinations did recover her: PPI with least squares, NMF, N-FINDR with polynomial unmixing, and PCA with the bilinear model. The conclusion shaped the next two years of work: acquisition quality decides the result.',
      location: { center: [27.54414, 61.44415], zoom: 13.5, pitch: 0, bearing: 150 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'real-rock-2025',
      kicker: 'Joensuu · lab',
      date: '2025-03',
      alignment: 'right',
      title: 'Real rock, 14 March 2025',
      images: [
        {
          src: '/images/real-rock-2025.jpg',
          alt: 'Small rock samples on black card under the spectrophotometer, labelled by hand',
          caption:
            'Samples 6 to 14 on black card. Sample 12 carries ochre, the back of sample 13 is bare rock.',
          focus: '50% 40%',
        },
      ],
      description:
        'Lab paint on lab stones is tidy. Real ochre on real rock is not. In March 2025 small rock fragments, with and without pigment, were measured in the Lambda 1050 from 250 to 2500 nm and imaged with a 410 to 720 nm camera against a Spectralon white reference. These are the field curves on the earlier chart: the ochre signature is there, flatter and noisier than the lab recipe, and the rock itself contains iron. These spectra became the endmembers for unmixing the field cubes.',
      location: { center: [29.7407, 62.6047], zoom: 15, pitch: 55, bearing: 60 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'washed-2026',
      kicker: 'Joensuu · lab',
      date: '2026-08',
      alignment: 'left',
      title: 'Washing the paint, 2026',
      images: [
        {
          src: '/images/vnir-swir.svg',
          alt: 'Reflectance curves 250 to 2500 nm with the VNIR and SWIR camera ranges shaded',
          caption:
            'The same four spectra as before, with each camera’s range marked. Lambda 1050 measurements, 2023 and 2025.',
        },
      ],
      description:
        'Thousands of years of rain, simulated in weeks. Painted samples were washed to medium and strong fading, then imaged in both the visible to near-infrared and the short-wave infrared, and the two cubes registered and fused into one. The same pipeline was then run on real-site data from Ukonvuori to confirm it works outside the lab. The dataset, raw and processed, is packaged for the next paper and the next student.',
      location: { center: [29.62, 62.6], zoom: 12.5, pitch: 40, bearing: 0 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'saraakallio',
      kicker: 'Saraakallio · Laukaa',
      alignment: 'left',
      title: 'Saraakallio, Laukaa',
      images: [
        {
          src: '/images/saraakallio-cliff.jpg',
          alt: 'Top of the Saraakallio cliff with pines and Saraavesi lake below',
          caption: 'The cliff top above Saraavesi. The paintings are on the face below.',
        },
        {
          src: '/images/saraakallio-panel.jpg',
          alt: 'Faded red ochre figures on a lichen-covered panel at Saraakallio',
          caption: 'One of the panels. Red ochre figures fading into lichen and granite.',
          focus: '50% 65%',
        },
      ],
      description:
        'A steep granite wall rising straight out of Saraavesi, two to three kilometres by water from Laukaa harbour. Saraakallio I and II together carry more than a hundred painted figures, among the richest sites in Finland. Elk, people, boats and hand prints, many faded to a stain. Painted from boats or from the winter ice, when the water stood higher than today.',
      location: { center: [25.99705, 62.41754], zoom: 12.2, pitch: 0, bearing: -20 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'saraakallio-2023',
      kicker: 'Saraakallio · field day',
      date: '2023-09',
      alignment: 'right',
      title: 'Saraakallio, 8 September 2023',
      images: [
        {
          src: '/images/saraakallio-2023-veikko.jpg',
          alt: 'Veikko Miettinen looking up at the Saraakallio cliff beside the Specim IQ camera',
          caption: 'Veikko Miettinen reading the cliff, Specim IQ on the tripod.',
          focus: '70% 50%',
        },
        {
          src: '/images/saraakallio-2023-panel.jpg',
          alt: 'Specim IQ camera pointed at a faint painted panel at Saraakallio',
          caption: 'Camera on a faint panel. Most figures here are barely visible.',
        },
      ],
      description:
        'The second site, and the first sunny field day. Thirty-one cubes were captured, numbered 089 to 119, sixteen of them with a clean white reference. The field notes mark the rest: surface too rough, ochre too thin, shadows across the panel. Direct sun, thin paint and uneven rock are the enemies of a good reflectance image, and this day showed which captures survive processing.',
      location: { center: [25.99705, 62.41754], zoom: 13.5, pitch: 0, bearing: 35 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'saraakallio-processing',
      kicker: 'Saraakallio · processing',
      date: '2024-04',
      alignment: 'left',
      title: 'What survives processing',
      images: [
        {
          src: '/images/saraakallio-panel.jpg',
          alt: 'Saraakallio panel, faded red figures, as photographed',
          caption: 'As photographed, 8 September 2023.',
          focus: '50% 65%',
        },
        {
          src: '/images/saraakallio-panel-dstretch.jpg',
          alt: 'The same Saraakallio panel after a decorrelation stretch, figures in strong false colour',
          caption:
            'Same frame after a decorrelation stretch. Hue differences are exaggerated, the figures jump out.',
          focus: '50% 65%',
        },
      ],
      description:
        'The field notes are blunt: 092 done, 095 done but light, 099 skipped for a rough surface, 101 and 102 skipped for thin ochre, 106 and 108 skipped for shadows. Of 31 cubes, 16 had a usable white reference and 7 went through the full pipeline. A decorrelation stretch on an ordinary photo shows why the effort is worth it: the figures are there, only a few units of hue away from the granite.',
      location: { center: [25.99705, 62.41754], zoom: 14, pitch: 0, bearing: -40 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'varikallio',
      kicker: 'Värikallio · Hossa',
      alignment: 'left',
      title: 'Värikallio, Hossa',
      images: [
        {
          src: '/images/varikallio-panorama.jpg',
          alt: 'Stitched panorama of the Värikallio painted wall',
          caption: 'The painted wall as a stitched panorama, 2024.',
        },
        {
          src: '/images/varikallio-wall.jpg',
          alt: 'Close view of red ochre figures on the Värikallio wall',
          caption: 'Red ochre on a wall that rises straight from Somerjärvi.',
          focus: '50% 40%',
        },
      ],
      description:
        'The northernmost of the three, in Hossa National Park near the Russian border. Värikallio, the colour rock, is a sheer wall standing in Lake Somerjärvi, with more than 60 figures: people, elk, hands, and shapes no one has named. In summer it is reached by a duckboard path and seen from a platform. In April the lake is still frozen and the whole wall can be approached across the ice. That is when the camera came.',
      location: { center: [29.30247, 65.51434], zoom: 12.5, pitch: 0, bearing: 20 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'hossa-2024',
      kicker: 'Värikallio · field day',
      date: '2024-04',
      alignment: 'right',
      title: 'On the ice, 11 April 2024',
      images: [
        {
          src: '/images/varikallio-2024-dmitry.jpg',
          alt: 'Dmitry Semenov at three tripods in front of the Värikallio wall, snow on the ground',
          caption:
            'Dmitry at the wall with three tripods. Spectral camera, DSLR and panorama head.',
          focus: '70% 50%',
        },
        {
          src: '/images/veikko-2024.jpg',
          alt: 'Veikko Miettinen sitting on the lake ice with a thermos, thumbs up',
          caption: 'Veikko on the ice. Gear came in on a sled over the frozen lake.',
          focus: '50% 25%',
        },
      ],
      description:
        'Gear on a sled, a long walk over the snow, then a full day on the ice at the foot of the wall. Captures 297 to 331, 14 with a good white reference, and all 14 processed. The flat April light reflected off the snow was kind: no hard shadows across the panel. Back in Joensuu this became the cleanest of the three datasets, and the first one every new method was tried on.',
      location: { center: [29.30247, 65.51434], zoom: 14.5, pitch: 0, bearing: -30 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'dstretch-2024',
      imageFit: 'contain',
      kicker: 'Värikallio · enhancement',
      date: '2024-05',
      alignment: 'full',
      title: 'Decorrelation stretch, May 2024',
      images: [
        {
          src: '/images/varikallio-dstretch-pair.jpg',
          alt: 'Värikallio panorama section, original beside its decorrelation-stretched version',
          caption:
            'Original and decorrelated, from the Värikallio panorama. Dmitry’s own implementation, May 2024.',
        },
      ],
      description:
        'Decorrelation stretch is the classic rock-art enhancement, borrowed from remote sensing and Mars rover imaging. Take the three colour channels, rotate them so they no longer correlate, stretch each to equal variance, rotate back. Subtle hue differences become loud false colour. It works on an ordinary photo and archaeologists have used it for twenty years. The team rebuilt it in Python and ran it on the Värikallio panorama in several colour spaces, as the baseline the hyperspectral data has to beat.',
      location: { center: [29.30247, 65.51434], zoom: 13.5, pitch: 0, bearing: 90 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'maxim-2025',
      imageFit: 'contain',
      kicker: 'Värikallio · thesis',
      date: '2025-05',
      alignment: 'full',
      title: 'Teaching a network to see paint, 2025',
      images: [
        {
          src: '/images/varikallio-pano-strip.jpg',
          alt: 'Värikallio panorama used as training image',
          caption: 'Input: the 15 000 pixel wide panorama, one section shown.',
        },
        {
          src: '/images/varikallio-labels.jpg',
          alt: 'Hand-drawn label mask over the panorama with background, paint and rock classes',
          caption:
            'Labels drawn in LabelMe: rock patches in yellow, two paint classes in red and green.',
        },
        {
          src: '/images/varikallio-prediction.jpg',
          alt: 'Network prediction mask showing paint pixels in white on black',
          caption: 'Output: pixels the model calls paint, threshold 0.65.',
        },
      ],
      description:
        'Maxim’s master’s thesis, 2025. Instead of a formula per pixel, a model that learns what paint looks like. In May 2025 the Värikallio panorama was labelled by hand in LabelMe as background, rock and paint, in two- and three-class versions, and a small convolutional network was trained on patches of it. The prediction map is the model’s view of the wall: white where it is confident there is pigment. Where it disagrees with the human labels is exactly where the hyperspectral data is tested next.',
      location: { center: [29.30247, 65.51434], zoom: 13, pitch: 0, bearing: 160 },
      mapAnimation: 'flyTo',
    },
    {
      id: 'outro',
      images: [
        {
          src: '/images/kummakivi-2025.jpg',
          alt: 'A person standing under Kummakivi, a huge boulder balanced on a smaller rock in a spruce forest',
          caption:
            'Kummakivi, Ruokolahti, 22 September 2025. A detour on the way home from Astuvansalmi.',
          focus: 'center 40%',
        },
        {
          src: '/images/ylamylly-2026.jpg',
          alt: 'A roadside bank of loose granite stones among young birches',
          caption:
            'Ylämylly, Liperi, 25 May 2026. The next set of rock samples came from this bank.',
        },
      ],
      kicker: 'Epilogue',
      alignment: 'left',
      title: 'And much more, done and coming',
      description:
        'What fits in these slides is a fraction of the work. Between field days there were test measurements in the university yard with gradients, screens and hand shadows, to learn how daylight distorts a reflectance image. A cloudy-sky spectrum before the first trip. Kummakivi, the balancing rock, on the way home from Astuvansalmi. Stones from Ylämylly as the next sample set. Panoramas stitched in Autopano, a DStretch rebuilt in Python, an archive of about ninety cubes across three sites with every white reference logged. Still to come: the drone over Yövesi on a calm day, a portable dark box to take the weather out of field imaging, ochre spectra compared site to site to ask whether the same hands painted them, and an open spectral database for anyone who wants to read the rock.',
      location: { center: [24.6, 63.0], zoom: 5.3, pitch: 0, bearing: 0 },
      mapAnimation: 'flyTo',
      onChapterEnter: [
        { layer: 'finland-sites', opacity: 1 },
        { layer: 'sites', opacity: 1 },
        { layer: 'sites-label', opacity: 1 },
        { layer: 'lab', opacity: 1 },
      ],
    },
  ],
};
