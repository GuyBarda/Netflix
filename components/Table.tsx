import { CheckIcon } from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { productState } from '../atoms/modalAtoms';
import { Product } from '../typings';

interface Props {
    selectedPlan: Product;
}

const Table = ({ selectedPlan }: Props) => {
    const [products, setProducts] = useRecoilState(productState);

    const textColor = (id: string) => {
        return id === selectedPlan.id ? 'text-[#e50914]' : 'text-[gray]';
    };

    return (
        <table>
            <tbody className="divide-y divide-[gray]">
                <tr className="t-row">
                    <td className="td-title">Monthly price</td>
                    {products?.map(({ id, price }) => (
                        <td className={`td-feature ${textColor(id)}`} key={id}>
                            {price} USD
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
                            {metadata.portability && (
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
