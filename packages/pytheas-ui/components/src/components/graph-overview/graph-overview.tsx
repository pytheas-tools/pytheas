import { Component, Prop } from '@stencil/core';
import { OverviewData } from './overview-data';

@Component({
    tag: 'py-graph-overview',
    styleUrl: 'graph-overview.scss',
    shadow: false
})
export class GraphOverview {
    @Prop()
    data: OverviewData;

    inDetailList = false;

    componentWillLoad() {
        console.log('GraphOverview is about to be rendered..: ', this.data);
    }

    componentDidLoad() {
        console.log('GraphOverview is rendered : ', this.data);
    }

    selectType() {
        this.inDetailList = true;
    }

    renderInternal() {
        if (this.inDetailList) {
            return <div class="type-list" />;
        } else {
            return (
                <ul class="types-list">
                    {this.data.files ? (
                        <li class="type file" data-badge={this.data.files}>
                            Files{' '}
                        </li>
                    ) : (
                        ''
                    )}
                    {this.data.classes ? (
                        <li class="type class" data-badge={this.data.classes}>
                            Classes
                        </li>
                    ) : (
                        ''
                    )}
                    {this.data.functions ? (
                        <li class="type function" data-badge={this.data.functions}>
                            Functions
                        </li>
                    ) : (
                        ''
                    )}
                </ul>
            );
        }
    }

    render() {
        return <div class="container">{this.renderInternal()}</div>;
    }
}
