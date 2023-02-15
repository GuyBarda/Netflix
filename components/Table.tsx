import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';

interface Props {
    selectedPlan: Product;
    products: Product[];
}

const Table = ({ selectedPlan, products }: Props) => {
    const textColor = (id: string) =>
        id === selectedPlan.id ? 'text-[#e50914]' : 'text-[gray]';

    return (
        <table>
            <tbody className="divide-y divide-[gray]">
                <tr className="t-row">
                    <td className="td-title">Monthly price</td>
                    {products?.map(({ id, prices }) => (
                        <td className={`td-feature ${textColor(id)}`} key={id}>
                            {prices[0].unit_amount! / 100}{' '}
                            {prices[0].currency!.toUpperCase()}
                        </td>
                    ))}
                </tr>
                <tr className="t-row">
                    <td className="td-title">Video quality</td>
                    {products?.map(({ id, metadata }) => (
                        <td className={`td-feature ${textColor(id)}`} key={id}>
                            {metadata.videoQuality}
                        </td>
                    ))}
                </tr>
                <tr className="t-row">
                    <td className="td-title">Resolution</td>
                    {products?.map(({ id, metadata }) => (
                        <td className={`td-feature ${textColor(id)}`} key={id}>
                            {metadata.resolution}
                        </td>
                    ))}
                </tr>
                <tr className="t-row">
                    <td className="td-title">
                        Watch on your TV, computer, mobile phone and tablet
                    </td>
                    {products?.map(({ id, metadata }) => (
                        <td className={`td-feature ${textColor(id)}`} key={id}>
                            {metadata.portability === 'true' && (
                                <CheckIcon className="inline-block h-8 w-8" />
                            )}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
