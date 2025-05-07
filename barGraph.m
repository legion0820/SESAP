load('barGraphData.mat'); % loads: wordCount, identities, themes

identities = flip(identities);  % reverse identities for visual alignment

figure;
barh(wordCount(:, end:-1:1), 'stacked');
set(gca, 'YTickLabel', identities, 'YTick', 1:numel(identities), 'FontSize', 8);
xlabel('Frequency');
ylabel(' ');
title(' ');
legend(flip(themes), 'Location', 'BestOutside');
saveas(gcf, fullfile('Images', 'barchart.png'));
