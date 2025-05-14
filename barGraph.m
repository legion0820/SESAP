clear;
close all;
clc;

load('GraphData.mat');

colors = [
    0.2  0.8  0.8;
    1    0.4  0.4;
    0.9  0.9  0.2;
    0.7  0.3  0.9;
    0.1  0.9  0.3;
    0.3  0.6  1;
    1    0.2  0.6;
    0.5  0.1  0.5;
    0.1  0.7  0.5;
    0.9  0.4  0.4;
    0.8  0.5  0.9;
    0.9  0.5  0.3;
    0.4  0.8  0.9;
    0.6  0.8  0.5;
];

figure;
h = barh(countMatch', 'stacked');

for k = 1:length(h)
    set(h(k), 'FaceColor', colors(k,:));
end

set(gca, 'YTick', 1:length(identities), 'YTickLabel', identities, 'FontSize', 9, 'YDir', 'reverse');
xlabel('Frequency');
ylabel(' ');
title('Theme Frequency per Identities Bar Chart');
legend(flip(themes), 'Location', 'BestOutside');
saveas(gcf, fullfile('Images', 'barchart.png'));
